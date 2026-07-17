import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { renderContactEmailHtml } from "@/components/email/ContactEmail";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // 1. Content-Type check
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ success: false, message: "Please check the highlighted fields." }, { status: 400 });
  }

  // 2. Body size check (Content-Length check)
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (isNaN(contentLength) || contentLength > 65536) {
      return NextResponse.json({ success: false, message: "Please check the highlighted fields." }, { status: 400 });
    }
  }

  // 3. Read body text and verify length
  let text: string;
  try {
    text = await request.text();
  } catch {
    return NextResponse.json({ success: false, message: "Please check the highlighted fields." }, { status: 400 });
  }

  if (text.length > 65536) {
    return NextResponse.json({ success: false, message: "Please check the highlighted fields." }, { status: 400 });
  }

  // 4. Safe JSON parsing
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ success: false, message: "Please check the highlighted fields." }, { status: 400 });
  }

  // 5. Honeypot check immediately after parsing
  if (body && typeof body === "object") {
    const companyWebsite = (body as Record<string, unknown>).companyWebsite;
    if (companyWebsite && typeof companyWebsite === "string" && companyWebsite.trim().length > 0) {
      // Return same generic success response without validating Turnstile or sending email
      return NextResponse.json({ success: true, message: "Your message was sent successfully." }, { status: 200 });
    }
  }

  // 6. Zod Validation
  const validation = contactSchema.safeParse(body);
  if (!validation.success) {
    const formatted = validation.error.format();
    const fieldErrors: Record<string, string> = {};
    
    if (formatted.name?._errors?.[0]) fieldErrors.name = formatted.name._errors[0];
    if (formatted.email?._errors?.[0]) fieldErrors.email = formatted.email._errors[0];
    if (formatted.message?._errors?.[0]) fieldErrors.message = formatted.message._errors[0];
    if (formatted.turnstileToken?._errors?.[0]) fieldErrors.turnstileToken = formatted.turnstileToken._errors[0];

    return NextResponse.json({
      success: false,
      message: "Please check the highlighted fields.",
      fieldErrors,
    }, { status: 400 });
  }

  const { name, email, message, turnstileToken } = validation.data;

  // 7. Verify Turnstile token
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return NextResponse.json(
      { success: false, code: "TURNSTILE_INVALID", message: "Your message could not be sent right now." },
      { status: 400 }
    );
  }

  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: ip || "",
      }).toString(),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!verifyRes.ok) {
      return NextResponse.json(
        { success: false, code: "TURNSTILE_INVALID", message: "Verification failed. Please retry." },
        { status: 400 }
      );
    }

    const verifyData = await verifyRes.json();

    if (process.env.NODE_ENV === "development") {
      console.log("[Turnstile siteverify response]", {
        success: verifyData.success,
        hostname: verifyData.hostname,
        action: verifyData.action,
        "error-codes": verifyData["error-codes"],
      });
    }

    if (!verifyData.success) {
      const errorCodes = verifyData["error-codes"] || [];
      const isExpired = errorCodes.includes("timeout-or-duplicate");
      return NextResponse.json(
        {
          success: false,
          code: isExpired ? "TURNSTILE_EXPIRED" : "TURNSTILE_INVALID",
          message: isExpired
            ? "The security verification expired. Please verify again."
            : "Verification failed. Please retry.",
        },
        { status: 400 }
      );
    }

    // Hostname check
    const isTestingSecret =
      turnstileSecret === "1x0000000000000000000000000000000AA" ||
      turnstileSecret === "2x0000000000000000000000000000000AA" ||
      turnstileSecret === "3x0000000000000000000000000000000AA";

    if (!isTestingSecret) {
      const allowedHostnamesEnv = process.env.CONTACT_ALLOWED_HOSTNAMES;
      if (allowedHostnamesEnv) {
        const allowed = allowedHostnamesEnv.split(",").map((h) => h.trim().toLowerCase());
        const returnedHostname = (verifyData.hostname || "").trim().toLowerCase();
        if (!returnedHostname || !allowed.includes(returnedHostname)) {
          return NextResponse.json(
            { success: false, code: "TURNSTILE_INVALID", message: "Verification failed. Please retry." },
            { status: 400 }
          );
        }
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (process.env.NODE_ENV === "development") {
      console.error("Turnstile verification caught error:", error);
    }
    return NextResponse.json(
      { success: false, code: "TURNSTILE_INVALID", message: "Verification failed. Please retry." },
      { status: 400 }
    );
  }

  // 8. Resend Email Sending
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    if (process.env.NODE_ENV === "development") {
      console.error("Missing config: RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL");
    }
    return NextResponse.json(
      { success: false, code: "EMAIL_SEND_FAILED", message: "Your message could not be sent right now." },
      { status: 500 }
    );
  }

  // Sanitize name for subject to prevent CRLF injection
  const sanitizedName = name.replace(/[\r\n]/g, "").trim();
  const subject = `Portfolio enquiry from ${sanitizedName}`;
  const timestamp = new Date().toUTCString();

  try {
    const htmlContent = renderContactEmailHtml({ name: sanitizedName, email, message, timestamp });

    const resend = new Resend(resendApiKey);
    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      html: htmlContent,
    });

    if (sendError) {
      console.error("[Resend] failure:", sendError.message);
      return NextResponse.json(
        { success: false, code: "EMAIL_SEND_FAILED", message: "Your message could not be sent right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Your message was sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("[Resend] failure:", error);
    return NextResponse.json(
      { success: false, code: "EMAIL_SEND_FAILED", message: "Your message could not be sent right now." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { getContactEnv } from '@/lib/env/contact';
import { verifyTurnstile } from '@/lib/contact/verify-turnstile';
import { sendContactEmail } from '@/lib/contact/send-contact-email';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Validate contact environment variables at route boundary
  let contactEnv;
  try {
    contactEnv = getContactEnv();
  } catch {
    logger.error('API route config verification failed. Configuration is invalid.');
    return NextResponse.json(
      { success: false, error: 'The contact service is temporarily unavailable.' },
      { status: 500 },
    );
  }

  // 1. Content-Type check
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    logger.warn('Invalid content-type header', { contentType });
    return NextResponse.json(
      { success: false, message: 'Please check the highlighted fields.' },
      { status: 400 },
    );
  }

  // 2. Body size check (Content-Length check)
  const contentLengthHeader = request.headers.get('content-length');
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (isNaN(contentLength) || contentLength > 65536) {
      logger.warn('Request body exceeded maximum content length', { contentLength });
      return NextResponse.json(
        { success: false, message: 'Please check the highlighted fields.' },
        { status: 400 },
      );
    }
  }

  // 3. Read body text and verify length
  let text: string;
  try {
    text = await request.text();
  } catch (err) {
    logger.error('Failed to read raw request text.', err);
    return NextResponse.json(
      { success: false, message: 'Please check the highlighted fields.' },
      { status: 400 },
    );
  }

  if (text.length > 65536) {
    logger.warn('Request payload string exceeded limits', { length: text.length });
    return NextResponse.json(
      { success: false, message: 'Please check the highlighted fields.' },
      { status: 400 },
    );
  }

  // 4. Safe JSON parsing
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    logger.warn('Failed to parse request JSON payload.');
    return NextResponse.json(
      { success: false, message: 'Please check the highlighted fields.' },
      { status: 400 },
    );
  }

  // 5. Honeypot check immediately after parsing
  if (body && typeof body === 'object') {
    const companyWebsite = (body as Record<string, unknown>).companyWebsite;
    if (companyWebsite && typeof companyWebsite === 'string' && companyWebsite.trim().length > 0) {
      logger.info('Honeypot field triggered. Discarding submission silently.');
      return NextResponse.json(
        { success: true, message: 'Your message was sent successfully.' },
        { status: 200 },
      );
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
    if (formatted.turnstileToken?._errors?.[0])
      fieldErrors.turnstileToken = formatted.turnstileToken._errors[0];

    logger.warn('Zod schema validation failed on client fields.');
    return NextResponse.json(
      {
        success: false,
        message: 'Please check the highlighted fields.',
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, message, turnstileToken } = validation.data;

  // 7. Verify Turnstile token
  const ip =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
  const turnstileSecret = contactEnv.turnstileSecretKey;

  const verification = await verifyTurnstile(turnstileToken, turnstileSecret, ip);

  if (!verification.success) {
    if (verification.reason === 'missing-token') {
      return NextResponse.json(
        {
          success: false,
          code: 'TURNSTILE_INVALID',
          message: 'Verification failed. Please retry.',
        },
        { status: 400 },
      );
    }

    if (verification.reason === 'network-error') {
      return NextResponse.json(
        {
          success: false,
          code: 'TURNSTILE_INVALID',
          message: 'Verification failed. Please retry.',
        },
        { status: 400 },
      );
    }

    const errorCodes = verification.errorCodes || [];
    const isExpired = errorCodes.includes('timeout-or-duplicate');

    return NextResponse.json(
      {
        success: false,
        code: isExpired ? 'TURNSTILE_EXPIRED' : 'TURNSTILE_INVALID',
        message: isExpired
          ? 'The security verification expired. Please verify again.'
          : 'Verification failed. Please retry.',
      },
      { status: 400 },
    );
  }

  // 8. Hostname check
  const isTestingSecret =
    turnstileSecret === '1x0000000000000000000000000000000AA' ||
    turnstileSecret === '2x0000000000000000000000000000000AA' ||
    turnstileSecret === '3x0000000000000000000000000000000AA';

  if (!isTestingSecret) {
    const allowedHostnamesEnv = process.env.CONTACT_ALLOWED_HOSTNAMES;
    if (allowedHostnamesEnv) {
      const allowed = allowedHostnamesEnv.split(',').map((h) => h.trim().toLowerCase());
      const returnedHostname = (verification.hostname || '').trim().toLowerCase();
      if (!returnedHostname || !allowed.includes(returnedHostname)) {
        logger.warn('Turnstile origin hostname rejected', { returnedHostname });
        return NextResponse.json(
          {
            success: false,
            code: 'TURNSTILE_INVALID',
            message: 'Verification failed. Please retry.',
          },
          { status: 400 },
        );
      }
    }
  }

  // 9. Resend Email Sending
  const delivery = await sendContactEmail({
    resendApiKey: contactEnv.resendApiKey,
    fromEmail: contactEnv.contactFromEmail,
    toEmail: contactEnv.contactToEmail,
    replyToEmail: email,
    name,
    message,
  });

  if (!delivery.success) {
    return NextResponse.json(
      {
        success: false,
        code: 'EMAIL_SEND_FAILED',
        message: 'Your message could not be sent right now.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, message: 'Your message was sent successfully.' },
    { status: 200 },
  );
}

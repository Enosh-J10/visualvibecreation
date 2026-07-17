import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export function renderContactEmailHtml({ name, email, message, timestamp }: ContactEmailProps): string {
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const escapedTimestamp = escapeHtml(timestamp);

  return `
    <div
      style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; background-color: #0d0e12; color: #f3f4f6; border-radius: 12px; border: 1px solid #1f2937; max-width: 600px; margin: 0 auto;"
    >
      <h2
        style="font-size: 18px; font-weight: bold; color: #2dd4bf; border-bottom: 1px solid #1f2937; padding-bottom: 12px; margin-top: 0;"
      >
        Enosh Jaques Portfolio Contact Form
      </h2>
      <div style="margin-top: 16px; font-size: 14px; line-height: 1.5;">
        <p style="margin: 6px 0;">
          <strong style="color: #9ca3af;">Sender Name:</strong> ${escapedName}
        </p>
        <p style="margin: 6px 0;">
          <strong style="color: #9ca3af;">Sender Email:</strong> ${escapedEmail}
        </p>
        <p style="margin: 6px 0;">
          <strong style="color: #9ca3af;">Submission Time (UTC):</strong> ${escapedTimestamp}
        </p>
      </div>
      <div
        style="margin-top: 24px; padding: 16px; background-color: #161821; border-radius: 8px; border: 1px solid #1f2937;"
      >
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #2dd4bf;">
          Message:
        </p>
        <p
          style="margin: 0; font-size: 13px; line-height: 1.6; color: #e5e7eb;"
        >
          ${escapedMessage}
        </p>
      </div>
    </div>
  `;
}

// Keep original React component in case it's used elsewhere
export function ContactEmail({ name, email, message, timestamp }: ContactEmailProps) {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        backgroundColor: "#0d0e12",
        color: "#f3f4f6",
        borderRadius: "12px",
        border: "1px solid #1f2937",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#2dd4bf",
          borderBottom: "1px solid #1f2937",
          paddingBottom: "12px",
          marginTop: 0,
        }}
      >
        Enosh Jaques Portfolio Contact Form
      </h2>
      <div style={{ marginTop: "16px", fontSize: "14px", lineHeight: "1.5" }}>
        <p style={{ margin: "6px 0" }}>
          <strong style={{ color: "#9ca3af" }}>Sender Name:</strong> {name}
        </p>
        <p style={{ margin: "6px 0" }}>
          <strong style={{ color: "#9ca3af" }}>Sender Email:</strong> {email}
        </p>
        <p style={{ margin: "6px 0" }}>
          <strong style={{ color: "#9ca3af" }}>Submission Time (UTC):</strong> {timestamp}
        </p>
      </div>
      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#161821",
          borderRadius: "8px",
          border: "1px solid #1f2937",
        }}
      >
        <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "600", color: "#2dd4bf" }}>
          Message:
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            color: "#e5e7eb",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

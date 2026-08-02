import "server-only";

import { emailEnabled, env } from "./env";

/**
 * Escapes text before it is placed in an HTML email body.
 *
 * Every value in these emails originates from a public form, so it is treated
 * as hostile: without this, a submitted `<img onerror>` would render in the
 * recruiter's mail client.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strips CR/LF from anything interpolated into a header-like position, so a
 * submitted newline cannot inject an extra header (reply-to, bcc, …).
 */
function sanitiseHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  /** Set to the submitter so a recruiter can just hit reply. */
  replyTo?: string;
};

export type SendResult =
  | { delivered: true }
  | { delivered: false; reason: "disabled" }
  | { delivered: false; reason: "failed"; status: number };

/**
 * Sends through the Resend REST API.
 *
 * Called directly over fetch rather than through the SDK: one less dependency
 * in a path that handles untrusted input, and the API surface is two fields.
 */
export async function sendEmail(payload: EmailPayload): Promise<SendResult> {
  if (!emailEnabled) return { delivered: false, reason: "disabled" };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [payload.to],
      subject: sanitiseHeaderValue(payload.subject),
      html: payload.html,
      ...(payload.replyTo
        ? { reply_to: sanitiseHeaderValue(payload.replyTo) }
        : {}),
    }),
    // Never let a slow provider hold the request open indefinitely.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    return { delivered: false, reason: "failed", status: response.status };
  }
  return { delivered: true };
}

/** Renders a label/value table. All values are escaped. */
export function renderRows(
  rows: readonly (readonly [label: string, value: string])[],
): string {
  const cells = rows
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 16px 10px 0;vertical-align:top;color:#5c5f5a;font:500 12px/1.5 ui-monospace,monospace;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:10px 0;vertical-align:top;color:#0b1524;font:400 15px/1.6 ui-sans-serif,system-ui,sans-serif">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${cells}</table>`;
}

/** Wraps content in the shell used by both notification emails. */
export function renderEmailShell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px;background:#f3f0e9">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2ded4;border-radius:8px;overflow:hidden">
    <div style="background:#0b1524;padding:20px 28px">
      <p style="margin:0;color:#00c88b;font:500 11px/1.4 ui-monospace,monospace;letter-spacing:0.14em;text-transform:uppercase">Swift Hire</p>
      <h1 style="margin:8px 0 0;color:#f3f0e9;font:700 20px/1.3 ui-sans-serif,system-ui,sans-serif">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:28px">${body}</div>
  </div>
</body></html>`;
}

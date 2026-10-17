import { SITE_URL, type Env } from "./_lib";
export type { Env } from "./_lib";

export const DEFAULT_FROM = "hello@traverseminds.com";
export const DEFAULT_NOTIFY = "traversemindsug@gmail.com";

export const sender = (env: Env, label = "Traverse Minds Africa") => `${label} <${env.EMAIL_FROM || DEFAULT_FROM}>`;
export const notifyTo = (env: Env) => env.EMAIL_NOTIFY || DEFAULT_NOTIFY;

export async function sendEmail(env: Env, payload: {
  from?: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  /** Base64-encoded file contents */
  attachments?: { filename: string; content: string }[];
}) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from ?? sender(env),
      to: [payload.to],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      attachments: payload.attachments,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0f1f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f1f4;padding:48px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:#000000;padding:32px 40px 28px;">
            <p style="margin:0 0 6px;color:#ff4c00;font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;">Traverse Minds Africa</p>
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:500;letter-spacing:-0.4px;line-height:1.35;">${title}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 32px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f0f1f4;border-top:1px solid rgba(0,0,0,0.08);">
            <p style="margin:0;font-size:11px;color:#919499;text-align:center;letter-spacing:0.3px;line-height:1.6;">
              Traverse Minds Africa &bull; <a href="${SITE_URL}" style="color:#919499;text-decoration:none;">traverseminds.ug</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function fieldRow(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
      <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#919499;letter-spacing:1.6px;text-transform:uppercase;">${label}</p>
      <p style="margin:0;font-size:15px;color:#000000;line-height:1.55;">${value}</p>
    </td>
  </tr>`;
}

export function ctaButton(label: string, href: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
    <tr>
      <td style="background:#ff4c00;border-radius:4px;">
        <a href="${href}" style="display:block;padding:14px 28px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.6px;text-transform:uppercase;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

export function signature(env: Env): string {
  const from = env.EMAIL_FROM || DEFAULT_FROM;
  return `
  <p style="margin:28px 0 0;font-size:13px;color:#919499;line-height:1.7;border-top:1px solid rgba(0,0,0,0.06);padding-top:20px;">
    The Traverse Minds Africa Team<br>
    <a href="mailto:${from}" style="color:#ff4c00;text-decoration:none;">${from}</a>
  </p>`;
}

export function timestamp(): string {
  return `<p style="margin:20px 0 0;font-size:11px;color:#c0c3c8;">Submitted at ${new Date().toUTCString()}</p>`;
}

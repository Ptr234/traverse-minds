import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const FROM = process.env.EMAIL_FROM || "hello@traverseminds.com";
const NOTIFY_TO = process.env.EMAIL_NOTIFY || "traversemindsug@gmail.com";
const LOGO_URL = "https://traverseminds.ug/icons/email-logo.png";
const SITE_URL = "https://traverseminds.ug";

interface Attachment {
  filename: string;
  content: Buffer;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}

export async function sendEmail({ to, subject, html, replyTo, attachments }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: `Traverse Minds Africa <${FROM}>`,
    to,
    subject,
    html,
    replyTo: replyTo || FROM,
    attachments,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Traverse Minds Africa</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
              <img src="${LOGO_URL}" width="56" height="56" alt="Traverse Minds Africa" style="display:inline-block;width:56px;height:56px;" />
              <p style="margin:12px 0 0;color:#ffffff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Traverse Minds Africa</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;border-top:1px solid #e8e8e8;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#888;font-family:Arial,Helvetica,sans-serif;">
                Traverse Minds Africa &middot; Kampala, Uganda
              </p>
              <p style="margin:0 0 12px;font-size:11px;color:#aaa;font-family:Arial,Helvetica,sans-serif;font-style:italic;">
                Built for Africa &middot; Driven by Evidence
              </p>
              <a href="${SITE_URL}" style="font-size:11px;color:#ff4c00;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">${SITE_URL.replace("https://", "")}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function dividerHtml(): string {
  return `<hr style="border:none;border-top:1px solid #e8e8e8;margin:28px 0;" />`;
}

function accentBar(text: string): string {
  return `<div style="border-left:3px solid #ff4c00;padding:10px 16px;background:#fff8f6;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#ff4c00;font-weight:bold;letter-spacing:0.05em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${text}</p>
  </div>`;
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;vertical-align:top;width:140px;font-size:13px;color:#888;font-family:Arial,Helvetica,sans-serif;">${label}</td>
    <td style="padding:8px 0;vertical-align:top;font-size:13px;color:#111;font-family:Arial,Helvetica,sans-serif;">${value}</td>
  </tr>`;
}

/* ──────────────────────────────────────────
   Auto-reply: general contact enquiry
────────────────────────────────────────── */
export async function sendAutoReply({
  to,
  name,
  division,
}: {
  to: string;
  name: string;
  division?: string;
}) {
  const divisionText = division ? ` regarding <strong>${division}</strong>` : "";

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">Thank you, ${name}.</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,Helvetica,sans-serif;">Your enquiry has been received</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      We have received your enquiry${divisionText} and a member of our team will respond within <strong>1 business day</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      If your matter is urgent, you can reach us directly via WhatsApp or reply to this email.
    </p>
    ${dividerHtml()}
    <p style="margin:0;font-size:13px;color:#aaa;font-family:Arial,Helvetica,sans-serif;">
      This is an automated confirmation. Please do not reply directly to this message — instead, use <a href="mailto:${FROM}" style="color:#ff4c00;">${FROM}</a>.
    </p>
  `;

  return sendEmail({
    to,
    subject: "We received your enquiry — Traverse Minds Africa",
    html: emailShell(content),
  });
}

/* ──────────────────────────────────────────
   Internal notification: contact form
────────────────────────────────────────── */
export function buildContactNotificationHtml(fields: {
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  division?: string;
  serviceType?: string;
  message: string;
}): string {
  const content = `
    ${accentBar("New Enquiry")}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Name", fields.name)}
      ${fieldRow("Email", `<a href="mailto:${fields.email}" style="color:#ff4c00;">${fields.email}</a>`)}
      ${fields.organisation ? fieldRow("Organisation", fields.organisation) : ""}
      ${fields.phone ? fieldRow("Phone", fields.phone) : ""}
      ${fields.division ? fieldRow("Division", fields.division) : ""}
      ${fields.serviceType ? fieldRow("Service", fields.serviceType) : ""}
    </table>
    ${dividerHtml()}
    <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#555;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,Helvetica,sans-serif;">Message</p>
    <p style="margin:0;font-size:15px;line-height:1.7;color:#222;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;">${fields.message}</p>
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   Waitlist: internal notification
────────────────────────────────────────── */
export function buildWaitlistNotificationHtml(fields: {
  name: string;
  email: string;
  organisation?: string;
  persona: string;
  countryInterest?: string[];
  message?: string;
}): string {
  const content = `
    ${accentBar("New Waitlist Entry — Public Record Africa")}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Name", fields.name)}
      ${fieldRow("Email", `<a href="mailto:${fields.email}" style="color:#ff4c00;">${fields.email}</a>`)}
      ${fields.organisation ? fieldRow("Organisation", fields.organisation) : ""}
      ${fieldRow("Persona", fields.persona)}
      ${fields.countryInterest?.length ? fieldRow("Countries", fields.countryInterest.join(", ")) : ""}
    </table>
    ${fields.message ? `${dividerHtml()}<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#555;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,Helvetica,sans-serif;">Message</p><p style="margin:0;font-size:15px;line-height:1.7;color:#222;font-family:Arial,Helvetica,sans-serif;">${fields.message}</p>` : ""}
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   Waitlist: user confirmation
────────────────────────────────────────── */
export function buildWaitlistConfirmationHtml(name: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">You're on the list, ${name}.</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,Helvetica,sans-serif;">Public Record Africa — Early Access</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      Thank you for joining the waitlist for <strong>Public Record Africa</strong> — Africa's AI-powered public document platform.
    </p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      We are currently in private beta, indexing thousands of records across Uganda, Kenya, Tanzania, Rwanda, and Burundi. We will notify you as soon as early access is available for your account.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <a href="${SITE_URL}/public-record" style="display:inline-block;background:#ff4c00;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-size:14px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Learn More</a>
    </td></tr></table>
    ${dividerHtml()}
    <p style="margin:0;font-size:13px;color:#aaa;font-family:Arial,Helvetica,sans-serif;">
      Follow our updates on <a href="https://linkedin.com/company/traverseminds" style="color:#ff4c00;">LinkedIn</a> for the latest news.
    </p>
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   RSVP: internal notification
────────────────────────────────────────── */
export function buildRsvpNotificationHtml(fields: {
  name: string;
  email: string;
  organisation: string;
  eventTitle: string;
  dietary?: string;
}): string {
  const content = `
    ${accentBar(`New RSVP — ${fields.eventTitle}`)}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Event", fields.eventTitle)}
      ${fieldRow("Name", fields.name)}
      ${fieldRow("Email", `<a href="mailto:${fields.email}" style="color:#ff4c00;">${fields.email}</a>`)}
      ${fieldRow("Organisation", fields.organisation)}
      ${fieldRow("Dietary", fields.dietary || "None specified")}
    </table>
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   RSVP: attendee confirmation
────────────────────────────────────────── */
export function buildRsvpConfirmationHtml(name: string, eventTitle: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">You're registered, ${name}!</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,Helvetica,sans-serif;">${eventTitle}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      Thank you for registering for <strong>${eventTitle}</strong>. We'll send you a reminder with full event details closer to the date.
    </p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      If you have any questions, reply to this email or reach us directly on WhatsApp.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <a href="${SITE_URL}/events" style="display:inline-block;background:#ff4c00;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-size:14px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">View All Events</a>
    </td></tr></table>
    ${dividerHtml()}
    <p style="margin:0;font-size:13px;color:#aaa;font-family:Arial,Helvetica,sans-serif;">
      This confirmation was sent to you because you registered for a Traverse Minds Africa event.
    </p>
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   Report download: user confirmation
────────────────────────────────────────── */
export function buildReportDownloadConfirmationHtml(downloadUrl: string, reportTitle: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">Your report is attached.</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,Helvetica,sans-serif;">${reportTitle} — Traverse Think Tank</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333;font-family:Arial,Helvetica,sans-serif;">
      Thank you for your interest in our research. You will find the PDF attached to this email.
      If you have trouble opening the attachment, you can also download it using the button below.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:28px;">
      <a href="${downloadUrl}" style="display:inline-block;background:#ff4c00;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-size:14px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Download the Report</a>
    </td></tr></table>
    ${dividerHtml()}
    <p style="margin:0;font-size:13px;color:#aaa;font-family:Arial,Helvetica,sans-serif;">
      You have been added to our research mailing list. Follow our work on <a href="https://linkedin.com/company/traverseminds" style="color:#ff4c00;">LinkedIn</a>.
    </p>
  `;
  return emailShell(content);
}

/* ──────────────────────────────────────────
   Report download: internal notification
────────────────────────────────────────── */
export function buildReportDownloadNotificationHtml(email: string, reportTitle: string): string {
  const content = `
    ${accentBar("New Report Download Request")}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Email", `<a href="mailto:${email}" style="color:#ff4c00;">${email}</a>`)}
      ${fieldRow("Report", reportTitle)}
    </table>
  `;
  return emailShell(content);
}

export { NOTIFY_TO };

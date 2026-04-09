import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: `Traverse Minds Africa <${process.env.EMAIL_FROM || "hello@traverseminds.ug"}>`,
    to,
    subject,
    html,
    replyTo: replyTo || process.env.EMAIL_FROM || "hello@traverseminds.ug",
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

export async function sendAutoReply({
  to,
  name,
  division,
}: {
  to: string;
  name: string;
  division?: string;
}) {
  const divisionText = division ? ` regarding ${division}` : "";

  return sendEmail({
    to,
    subject: "We received your enquiry — Traverse Minds Africa",
    html: `
      <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #0D3B2E; font-size: 24px;">Thank you, ${name}.</h2>
        <p style="color: #444441; font-size: 16px; line-height: 1.6;">
          We have received your enquiry${divisionText} and a member of our team will respond within
          <strong>1 business day</strong>.
        </p>
        <p style="color: #444441; font-size: 16px; line-height: 1.6;">
          If your matter is urgent, you can reach us directly on WhatsApp.
        </p>
        <hr style="border: none; border-top: 1px solid #D3D1C7; margin: 24px 0;" />
        <p style="color: #888780; font-size: 13px;">
          Traverse Minds Africa · Kampala, Uganda<br />
          Built for Africa · Driven by Evidence
        </p>
      </div>
    `,
  });
}

import { Env, sendEmail, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";

const DIVISION_LABELS: Record<string, string> = {
  security: "Traverse Security",
  events: "Traverse Events",
  "public-record": "Public Record Africa",
  literacy: "Digital Literacy",
  media: "Traverse Media",
  "think-tank": "Think Tank",
  general: "General Enquiry",
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { "Content-Type": "application/json" };
  try {
    const data = await request.json() as Record<string, string>;

    if (data.honeypot) return new Response(JSON.stringify({ ok: true }), { headers: h });

    const division = DIVISION_LABELS[data.division] ?? data.division ?? "General Enquiry";

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds <hello@traverseminds.com>",
      to: "traversemindsug@gmail.com",
      replyTo: data.email,
      subject: `New Enquiry — ${division} — ${data.name}`,
      html: layout(`New Enquiry: ${division}`, `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldRow("Full Name", data.name)}
          ${fieldRow("Organisation", data.organisation)}
          ${fieldRow("Email", `<a href="mailto:${data.email}" style="color:#ff4c00;text-decoration:none;">${data.email}</a>`)}
          ${fieldRow("Phone", data.phone)}
          ${fieldRow("Division", division)}
          ${fieldRow("Budget Range", data.budgetRange)}
          ${fieldRow("Use Case", data.useCase)}
          ${fieldRow("Message", data.message?.replace(/\n/g, "<br>"))}
          ${fieldRow("How They Heard", data.howHeard)}
        </table>
        ${timestamp()}
      `),
    });

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds Africa <hello@traverseminds.com>",
      to: data.email,
      subject: "We've received your enquiry — Traverse Minds Africa",
      html: layout("We've received your enquiry", `
        <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${data.name.split(" ")[0]},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
          Thank you for contacting <strong style="color:#000;">Traverse Minds Africa</strong>.
          We have received your enquiry regarding <strong style="color:#000;">${division}</strong>
          and a member of our team will respond within <strong style="color:#000;">1 business day</strong>.
        </p>
        <p style="margin:0;font-size:15px;color:#515459;line-height:1.75;">
          In the meantime, explore our work at
          <a href="https://traverseminds.com" style="color:#ff4c00;text-decoration:none;font-weight:600;">traverseminds.com</a>.
        </p>
        ${ctaButton("Visit Our Website", "https://traverseminds.com")}
        ${signature()}
      `),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send. Please try again." }), { status: 500, headers: h });
  }
};

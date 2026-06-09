import { Env, sendEmail, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { "Content-Type": "application/json" };
  try {
    const data = await request.json() as Record<string, string>;

    if (data.honeypot) return new Response(JSON.stringify({ ok: true }), { headers: h });

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds Events <hello@traverseminds.com>",
      to: "petergra38@gmail.com",
      replyTo: data.email,
      subject: `New RSVP — ${data.eventTitle} — ${data.name}`,
      html: layout(`New RSVP: ${data.eventTitle}`, `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldRow("Event", data.eventTitle)}
          ${fieldRow("Full Name", data.name)}
          ${fieldRow("Organisation", data.organisation)}
          ${fieldRow("Email", `<a href="mailto:${data.email}" style="color:#ff4c00;text-decoration:none;">${data.email}</a>`)}
          ${fieldRow("Dietary Requirements", data.dietary || "None stated")}
        </table>
        ${timestamp()}
      `),
    });

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds Events <hello@traverseminds.com>",
      to: data.email,
      subject: `You're registered — ${data.eventTitle}`,
      html: layout(`You're registered`, `
        <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${data.name.split(" ")[0]},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
          Your registration for <strong style="color:#000;">${data.eventTitle}</strong> has been confirmed.
          We look forward to seeing you there.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
          A calendar invite and further event details will be sent closer to the date.
          If you have any questions in the meantime, reply to this email.
        </p>

        <!-- Registration summary -->
        <div style="background:#f0f1f4;border-radius:6px;padding:20px 24px;margin-bottom:8px;">
          <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#919499;">Your Registration</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;font-size:13px;color:#515459;width:120px;">Name</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${data.name}</td></tr>
            <tr><td style="padding:4px 0;font-size:13px;color:#515459;">Organisation</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${data.organisation}</td></tr>
            ${data.dietary ? `<tr><td style="padding:4px 0;font-size:13px;color:#515459;">Dietary</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${data.dietary}</td></tr>` : ""}
          </table>
        </div>

        ${ctaButton("View All Events", "https://traverseminds.com/events")}
        ${signature()}
      `),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to register. Please try again." }), { status: 500, headers: h });
  }
};

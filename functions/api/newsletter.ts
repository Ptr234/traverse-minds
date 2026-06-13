import { Env, sendEmail, layout, ctaButton, signature, timestamp } from "../_email";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { "Content-Type": "application/json" };
  try {
    const { email } = await request.json() as { email: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email." }), { status: 400, headers: h });
    }

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds <hello@traverseminds.com>",
      to: "traversemindsug@gmail.com",
      subject: `New Newsletter Subscriber — ${email}`,
      html: layout("New Newsletter Subscriber", `
        <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.7;">
          A new subscriber has joined the intelligence briefing list.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#919499;letter-spacing:1.6px;text-transform:uppercase;">Email</p>
              <p style="margin:0;font-size:15px;color:#000000;">
                <a href="mailto:${email}" style="color:#ff4c00;text-decoration:none;">${email}</a>
              </p>
            </td>
          </tr>
        </table>
        ${timestamp()}
      `),
    });

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds Africa <hello@traverseminds.com>",
      to: email,
      subject: "Welcome to the Traverse Minds Intelligence Briefing",
      html: layout("Welcome to the Briefing", `
        <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Welcome,</p>
        <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
          You are now subscribed to the <strong style="color:#000;">Traverse Minds Africa Intelligence Briefing</strong> —
          our weekly digest covering African cybersecurity trends, policy developments, and exclusive event invitations.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
          Your first briefing will arrive soon. In the meantime, explore our latest research and events below.
        </p>

        <!-- Highlights -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#ff4c00;">What to expect</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0 6px;">
              <p style="margin:0 0 8px;font-size:14px;color:#000;font-weight:600;">Weekly threat intelligence</p>
              <p style="margin:0;font-size:13px;color:#515459;line-height:1.6;">Curated analysis of the African cyber threat landscape from our Think Tank.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;border-top:1px solid rgba(0,0,0,0.05);">
              <p style="margin:0 0 8px;font-size:14px;color:#000;font-weight:600;">Policy & regulatory updates</p>
              <p style="margin:0;font-size:13px;color:#515459;line-height:1.6;">Key legislative changes affecting digital security across 54 African states.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;border-top:1px solid rgba(0,0,0,0.05);">
              <p style="margin:0 0 8px;font-size:14px;color:#000;font-weight:600;">Exclusive event invitations</p>
              <p style="margin:0;font-size:13px;color:#515459;line-height:1.6;">First access to the Cyber Luncheon and other high-level forums.</p>
            </td>
          </tr>
        </table>

        ${ctaButton("Explore Our Work", "https://traverseminds.com")}

        <p style="margin:20px 0 0;font-size:12px;color:#c0c3c8;line-height:1.6;">
          You can unsubscribe at any time by replying to this email with "Unsubscribe".
          We respect your data in accordance with Uganda PDPA 2019.
        </p>
        ${signature()}
      `),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to subscribe. Please try again." }), { status: 500, headers: h });
  }
};

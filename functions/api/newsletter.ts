import { sendEmail, sender, notifyTo, layout, fieldRow, ctaButton, timestamp } from "../_email";
import { type Env, SITE_URL, esc, readBody, isBot, store, deliver, ok, fail, validEmail } from "../_lib";

const highlight = (title: string, text: string, first = false) => `
  <tr>
    <td style="padding:${first ? "12px 0 6px" : "6px 0"};${first ? "" : "border-top:1px solid rgba(0,0,0,0.05);"}">
      <p style="margin:0 0 8px;font-size:14px;color:#000;font-weight:600;">${title}</p>
      <p style="margin:0;font-size:13px;color:#515459;line-height:1.6;">${text}</p>
    </td>
  </tr>`;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    if (!email) return fail(400, "Invalid email.");

    const stored = await store(env, request, "newsletter", { email, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        from: sender(env, "Traverse Minds"),
        to: notifyTo(env),
        subject: `New Newsletter Subscriber: ${email}`,
        html: layout("New Newsletter Subscriber", `
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.7;">
            A new subscriber has joined the intelligence briefing list.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
          </table>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        to: email,
        subject: "Welcome to the Traverse Minds Intelligence Briefing",
        html: layout("Welcome to the Briefing", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Welcome,</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            You are now subscribed to the <strong style="color:#000;">Traverse Minds Africa Intelligence Briefing</strong>,
            our weekly digest covering African cybersecurity trends, policy developments, and exclusive event invitations.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
            Your first briefing will arrive soon. In the meantime, explore our latest research and events below.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#ff4c00;">What to expect</p>
              </td>
            </tr>
            ${highlight("Weekly threat intelligence", "Curated analysis of the African cyber threat landscape from our Think Tank.", true)}
            ${highlight("Policy &amp; regulatory updates", "Key legislative changes affecting digital security across 54 African states.")}
            ${highlight("Exclusive event invitations", "First access to the Cyber Luncheon and other high-level forums.")}
          </table>
          ${ctaButton("Explore Our Work", SITE_URL)}
          <p style="margin:20px 0 0;font-size:12px;color:#c0c3c8;line-height:1.6;">
            You can unsubscribe at any time by replying to this email with "Unsubscribe".
            We respect your data in accordance with Uganda PDPA 2019.
          </p>
        `),
      }),
    ]), "Failed to subscribe. Please try again.");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to subscribe. Please try again.");
  }
};

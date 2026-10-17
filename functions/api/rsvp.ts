import { sendEmail, sender, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../_lib";

const summaryRow = (label: string, value: string, first = false) =>
  `<tr><td style="padding:4px 0;font-size:13px;color:#515459;${first ? "width:120px;" : ""}">${label}</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${value}</td></tr>`;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    const eventTitle = str(body.eventTitle, 200);
    if (!email) return fail(400, "A valid email address is required.");
    if (name.length < 2) return fail(400, "A valid name is required.");
    if (!eventTitle) return fail(400, "Event is missing.");

    const organisation = str(body.organisation, 160);
    const dietary = str(body.dietary, 300);

    const stored = await store(env, request, "rsvp", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        from: sender(env, "Traverse Minds Events"),
        to: notifyTo(env),
        replyTo: email,
        subject: `New RSVP: ${eventTitle}: ${name}`,
        html: layout(`New RSVP: ${esc(eventTitle)}`, `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Event", esc(eventTitle))}
            ${fieldRow("Full Name", esc(name))}
            ${fieldRow("Organisation", esc(organisation))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Dietary Requirements", esc(dietary) || "None stated")}
          </table>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        from: sender(env, "Traverse Minds Events"),
        to: email,
        subject: `You're registered: ${eventTitle}`,
        html: layout("You're registered", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(name.split(" ")[0])},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Your registration for <strong style="color:#000;">${esc(eventTitle)}</strong> has been confirmed.
            We look forward to seeing you there.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
            A calendar invite and further event details will be sent closer to the date.
            If you have any questions in the meantime, reply to this email.
          </p>
          <div style="background:#f0f1f4;border-radius:6px;padding:20px 24px;margin-bottom:8px;">
            <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#919499;">Your Registration</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${summaryRow("Name", esc(name), true)}
              ${organisation ? summaryRow("Organisation", esc(organisation)) : ""}
              ${dietary ? summaryRow("Dietary", esc(dietary)) : ""}
            </table>
          </div>
          ${ctaButton("View All Events", `${SITE_URL}/events`)}
          ${signature(env)}
        `),
      }),
    ]), "Failed to register. Please try again.");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to register. Please try again.");
  }
};

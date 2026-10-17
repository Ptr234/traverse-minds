import { sendEmail, notifyTo, layout, fieldRow, signature, timestamp } from "../../_email";
import { type Env, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail, hubspotContact } from "../../_lib";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    const organization = str(body.organization, 200);
    const phone = str(body.phone, 40);
    const level = str(body.sponsorshipLevel, 60) || "Custom";
    const message = str(body.message, 5000);

    if (!email) return fail(400, "A valid email address is required.");
    if (!name || !organization) return fail(400, "Missing required fields");

    const stored = await store(env, request, "mentorship-sponsor", { email, name, data: body });

    const response = await deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `Sponsorship Inquiry: ${level} level from ${organization}`,
        html: layout("New Sponsorship Inquiry", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone) || "Not provided")}
            ${fieldRow("Organisation", esc(organization))}
            ${fieldRow("Sponsorship Level", esc(level))}
            ${fieldRow("Message", escBr(message) || "No additional message")}
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#919499;">Submitted through the Accuracy Mentorship Program page.</p>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        to: email,
        subject: "Thank you for your interest in sponsoring the Accuracy Mentorship Program",
        html: layout("Thank you for your interest", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(name.split(" ")[0])},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for considering a sponsorship of the <strong style="color:#000;">Accuracy Mentorship Program</strong>
            on behalf of ${esc(organization)}. Our partnerships team will be in touch within 2 business days to discuss
            how your support can reach students.
          </p>
          ${signature(env)}
        `),
      }),
    ]), "Failed to submit sponsorship inquiry");

    await hubspotContact(env, {
      firstname: name.split(" ")[0],
      lastname: name.split(" ").slice(1).join(" "),
      email,
      phone,
      company: organization,
      hs_lead_status: "IN_PROGRESS",
    });
    return response;
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to submit sponsorship inquiry");
  }
};

import { sendEmail, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail, hubspotContact } from "../_lib";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    const organisation = str(body.organisation, 160);
    const teamSize = str(body.teamSize, 40);
    const sector = str(body.sector, 80);
    const deliveryFormat = str(body.deliveryFormat, 80);
    const timeline = str(body.timeline, 80);
    const phone = str(body.phone, 40);
    const message = str(body.message, 5000);

    if (name.length < 2) return fail(400, "A valid name is required.");
    if (!email) return fail(400, "A valid email address is required.");
    if (!organisation || !teamSize || !sector || !deliveryFormat || !message) {
      return fail(400, "Please complete all required fields.");
    }

    const stored = await store(env, request, "bulk-training-quote", { email, name, data: body });

    const response = await deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: email,
        subject: `Quote request received: Bulk Training for ${organisation}`,
        html: layout(`Quote request received, ${esc(name.split(" ")[0])}.`, `
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Digital Literacy &amp; Cybersecurity Training for <strong style="color:#000;">${esc(organisation)}</strong>.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Team size", `${esc(teamSize)} participants`)}
            ${fieldRow("Sector", esc(sector))}
            ${fieldRow("Delivery", esc(deliveryFormat))}
            ${fieldRow("Timeline", esc(timeline))}
          </table>
          <p style="margin:20px 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for reaching out. A member of our training team will review your requirements and send you
            a tailored proposal within <strong style="color:#000;">1 business day</strong>.
          </p>
          <p style="margin:0;font-size:15px;color:#515459;line-height:1.75;">
            Our trainer will contact you to discuss your team's specific threats, preferred schedule, and learning
            objectives before sending a formal proposal and pricing.
          </p>
          ${ctaButton("View Training Programmes", `${SITE_URL}/literacy`)}
          ${signature(env)}
        `),
      }),
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `Bulk Training Quote: ${organisation} (${teamSize}, ${deliveryFormat})`,
        html: layout("New Bulk Training Quote Request", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Organisation", esc(organisation))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone))}
            ${fieldRow("Team Size", `${esc(teamSize)} participants`)}
            ${fieldRow("Sector", esc(sector))}
            ${fieldRow("Delivery", esc(deliveryFormat))}
            ${fieldRow("Timeline", esc(timeline))}
            ${fieldRow("Notes / Specific Needs", escBr(message))}
          </table>
          ${timestamp()}
        `),
      }),
    ]), "Failed to submit your request. Please try again.");

    await hubspotContact(env, {
      firstname: name.split(" ")[0],
      lastname: name.split(" ").slice(1).join(" "),
      email,
      phone,
      company: organisation,
      hs_lead_status: "IN_PROGRESS",
    });
    return response;
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to submit your request. Please try again.");
  }
};

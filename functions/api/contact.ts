import { sendEmail, sender, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../_lib";

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
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    if (!email) return fail(400, "A valid email address is required.");
    if (name.length < 2) return fail(400, "A valid name is required.");

    const divisionKey = str(body.division, 60);
    const division = DIVISION_LABELS[divisionKey] ?? (divisionKey || "General Enquiry");

    const stored = await store(env, request, "contact", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        from: sender(env, "Traverse Minds"),
        to: notifyTo(env),
        replyTo: email,
        subject: `New Enquiry: ${division}: ${name}`,
        html: layout(`New Enquiry: ${esc(division)}`, `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Full Name", esc(name))}
            ${fieldRow("Organisation", esc(str(body.organisation, 160)))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(str(body.phone, 40)))}
            ${fieldRow("Division", esc(division))}
            ${fieldRow("Budget Range", esc(str(body.budgetRange, 80)))}
            ${fieldRow("Use Case", esc(str(body.useCase, 200)))}
            ${fieldRow("Message", escBr(str(body.message, 5000)))}
            ${fieldRow("How They Heard", esc(str(body.howHeard, 120)))}
          </table>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        to: email,
        subject: "We've received your enquiry: Traverse Minds Africa",
        html: layout("We've received your enquiry", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(name.split(" ")[0])},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for contacting <strong style="color:#000;">Traverse Minds Africa</strong>.
            We have received your enquiry regarding <strong style="color:#000;">${esc(division)}</strong>
            and a member of our team will respond within <strong style="color:#000;">1 business day</strong>.
          </p>
          <p style="margin:0;font-size:15px;color:#515459;line-height:1.75;">
            In the meantime, explore our work at
            <a href="${SITE_URL}" style="color:#ff4c00;text-decoration:none;font-weight:600;">traverseminds.ug</a>.
          </p>
          ${ctaButton("Visit Our Website", SITE_URL)}
          ${signature(env)}
        `),
      }),
    ]), "Failed to send. Please try again.");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to send. Please try again.");
  }
};

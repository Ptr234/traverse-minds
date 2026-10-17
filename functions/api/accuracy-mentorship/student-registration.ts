import { sendEmail, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../../_email";
import { type Env, SITE_URL, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../../_lib";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const firstName = str(body.firstName, 80);
    const lastName = str(body.lastName, 80);
    const phone = str(body.phone, 40);
    const school = str(body.school, 200);
    const ageGroup = str(body.ageGroup, 40);
    const motivation = str(body.motivation, 5000);

    if (!email) return fail(400, "A valid email address is required.");
    if (!firstName || !lastName || !phone || !school || !ageGroup || !motivation) {
      return fail(400, "Missing required fields");
    }

    const name = `${firstName} ${lastName}`;
    const stored = await store(env, request, "mentorship-student", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: email,
        subject: "Your Accuracy Mentorship Program application has been received",
        html: layout("Welcome to the Accuracy Mentorship Program", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(firstName)},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for applying to the Accuracy Mentorship Program. We've received your application and appreciate
            your interest in joining us on this journey of character formation.
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Our team will review your application and contact you within <strong style="color:#000;">5 business days</strong> with next steps.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("School", esc(school))}
            ${fieldRow("Age Group", esc(ageGroup))}
          </table>
          <p style="margin:20px 0 0;font-size:14px;color:#515459;font-style:italic;">
            "Accuracy is the quiet discipline of getting it right when no one's watching."
          </p>
          ${ctaButton("View the Programme", `${SITE_URL}/accuracy-mentorship`)}
          ${signature(env)}
        `),
      }),
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `New Student Application: ${name}`,
        html: layout("New Student Application", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone))}
            ${fieldRow("School", esc(school))}
            ${fieldRow("Age Group", esc(ageGroup))}
            ${fieldRow("Motivation", escBr(motivation))}
          </table>
          ${timestamp()}
        `),
      }),
    ]), "Failed to process application");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to process application");
  }
};

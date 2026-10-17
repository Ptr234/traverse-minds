import { sendEmail, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../../_email";
import { type Env, SITE_URL, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../../_lib";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const schoolName = str(body.schoolName, 200);
    const principalName = str(body.principalName, 120);
    const phone = str(body.phone, 40);
    const address = str(body.address, 300);
    const studentCount = str(body.studentCount, 40);
    const interest = str(body.interest, 5000);

    if (!email) return fail(400, "A valid email address is required.");
    if (!schoolName || !principalName || !phone || !address || !studentCount || !interest) {
      return fail(400, "Missing required fields");
    }

    const stored = await store(env, request, "mentorship-school", { email, name: principalName, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: email,
        subject: "Accuracy Mentorship Program: School Partnership Registration",
        html: layout("Welcome to the Accuracy Mentorship Program", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Dear ${esc(principalName)},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for registering <strong style="color:#000;">${esc(schoolName)}</strong> for the Accuracy Mentorship Program.
            We're excited about the possibility of partnering with your institution to bring character formation to your students.
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Our partnership team will contact you within <strong style="color:#000;">5 business days</strong> to discuss
            implementation options, timelines, and how we can tailor the program to your school's needs.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Institution", esc(schoolName))}
            ${fieldRow("Students (ages 14–25)", esc(studentCount))}
            ${fieldRow("Location", esc(address))}
          </table>
          ${ctaButton("View the Programme", `${SITE_URL}/accuracy-mentorship`)}
          ${signature(env)}
        `),
      }),
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `New School Partnership: ${schoolName}`,
        html: layout("New School Partnership Registration", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("School Name", esc(schoolName))}
            ${fieldRow("Principal / Head", esc(principalName))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone))}
            ${fieldRow("Address", esc(address))}
            ${fieldRow("Target Students (14–25)", esc(studentCount))}
            ${fieldRow("Interest / Participation Plan", escBr(interest))}
          </table>
          ${timestamp()}
        `),
      }),
    ]), "Failed to process registration");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to process registration");
  }
};

import { sendEmail, sender, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../_lib";

const PERSONA_LABELS: Record<string, string> = {
  legal: "Legal Professional",
  researcher: "Researcher / Academic",
  journalist: "Journalist",
  policy: "Policy Maker",
  business: "Business Intelligence",
  other: "Other",
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    if (!email) return fail(400, "A valid email address is required.");
    if (name.length < 2) return fail(400, "A valid name is required.");

    const organisation = str(body.organisation, 160);
    const personaKey = str(body.persona, 40);
    const persona = PERSONA_LABELS[personaKey] ?? personaKey;
    const countries = (Array.isArray(body.countryInterest) ? body.countryInterest : [])
      .map((c) => str(c, 40))
      .filter(Boolean)
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
      .join(", ");

    const stored = await store(env, request, "waitlist", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        from: sender(env, "Traverse Minds"),
        to: notifyTo(env),
        replyTo: email,
        subject: `New Waitlist: Public Record Africa: ${name}`,
        html: layout("New Public Record Waitlist", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Full Name", esc(name))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Organisation", esc(organisation))}
            ${fieldRow("Primary Role", esc(persona))}
            ${fieldRow("Jurisdictions of Interest", esc(countries))}
            ${fieldRow("Message", esc(str(body.message, 2000)))}
          </table>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        to: email,
        subject: "You're on the list: Public Record Africa",
        html: layout("You're on the list", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(name.split(" ")[0])},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            You have been added to the <strong style="color:#000;">Public Record Africa</strong> private beta waitlist.
            We are onboarding users in small cohorts to ensure high data integrity and dedicated support.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
            We will reach out directly when access opens for your cohort. Expect to hear from us soon.
          </p>
          <div style="background:#f0f1f4;border-radius:6px;padding:20px 24px;margin-bottom:8px;">
            <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#919499;">Your Registration</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:4px 0;font-size:13px;color:#515459;width:140px;">Role</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${esc(persona)}</td></tr>
              <tr><td style="padding:4px 0;font-size:13px;color:#515459;">Jurisdictions</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${esc(countries)}</td></tr>
            </table>
          </div>
          ${ctaButton("Learn More", `${SITE_URL}/public-record`)}
          ${signature(env)}
        `),
      }),
    ]), "Failed to submit. Please try again.");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to submit. Please try again.");
  }
};

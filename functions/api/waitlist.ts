import { Env, sendEmail, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";

const PERSONA_LABELS: Record<string, string> = {
  legal: "Legal Professional",
  researcher: "Researcher / Academic",
  journalist: "Journalist",
  policy: "Policy Maker",
  business: "Business Intelligence",
  other: "Other",
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { "Content-Type": "application/json" };
  try {
    const data = await request.json() as Record<string, string | string[]>;

    const name = data.name as string;
    const email = data.email as string;
    const organisation = data.organisation as string;
    const persona = PERSONA_LABELS[data.persona as string] ?? (data.persona as string);
    const countries = Array.isArray(data.countryInterest)
      ? data.countryInterest.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")
      : "";

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds <hello@traverseminds.com>",
      to: "traversemindsug@gmail.com",
      replyTo: email,
      subject: `New Waitlist — Public Record Africa — ${name}`,
      html: layout("New Public Record Waitlist", `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldRow("Full Name", name)}
          ${fieldRow("Email", `<a href="mailto:${email}" style="color:#ff4c00;text-decoration:none;">${email}</a>`)}
          ${fieldRow("Organisation", organisation)}
          ${fieldRow("Primary Role", persona)}
          ${fieldRow("Jurisdictions of Interest", countries)}
        </table>
        ${timestamp()}
      `),
    });

    await sendEmail(env.RESEND_API_KEY, {
      from: "Traverse Minds Africa <hello@traverseminds.com>",
      to: email,
      subject: "You're on the list — Public Record Africa",
      html: layout("You're on the list", `
        <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${name.split(" ")[0]},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
          You have been added to the <strong style="color:#000;">Public Record Africa</strong> private beta waitlist.
          We are onboarding users in small cohorts to ensure high data integrity and dedicated support.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#515459;line-height:1.75;">
          We will reach out directly when access opens for your cohort. Expect to hear from us soon.
        </p>

        <!-- Summary -->
        <div style="background:#f0f1f4;border-radius:6px;padding:20px 24px;margin-bottom:8px;">
          <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#919499;">Your Registration</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;font-size:13px;color:#515459;width:140px;">Role</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${persona}</td></tr>
            <tr><td style="padding:4px 0;font-size:13px;color:#515459;">Jurisdictions</td><td style="padding:4px 0;font-size:13px;color:#000;font-weight:500;">${countries}</td></tr>
          </table>
        </div>

        ${ctaButton("Learn More", "https://traverseminds.com/public-record")}
        ${signature()}
      `),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to submit. Please try again." }), { status: 500, headers: h });
  }
};

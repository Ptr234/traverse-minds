import { sendEmail, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, str, validEmail, readBody, isBot, store, deliver, ok, fail, hubspotContact } from "../_lib";
import { findPlan, type Billing } from "../../traverseminds-web/src/lib/plans";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    if (name.length < 2) return fail(400, "A valid name is required.");
    if (!email) return fail(400, "A valid email address is required.");

    // Price and features come from our own plan list, never from the request
    const billing: Billing = body.billing === "annual" ? "annual" : "monthly";
    const plan = findPlan(str(body.planName, 40), billing);
    if (!plan) return fail(400, "Plan details are missing.");

    const isEnterprise = plan.name === "Enterprise";
    const stored = await store(env, request, "pricing-enquiry", { email, name, data: { name, email, plan: plan.name, billing } });

    const response = await deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: email,
        subject: isEnterprise ? "Your Enterprise enquiry: Public Record Africa" : `You're on the list: ${plan.name} Plan, Public Record Africa`,
        html: layout(isEnterprise ? `Thanks, ${esc(name.split(" ")[0])}.` : `You're on the list, ${esc(name.split(" ")[0])}.`, `
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Public Record Africa, <strong style="color:#000;">${esc(plan.name)} Plan</strong>
            (${billing === "annual" ? "Annual" : "Monthly"}): <strong style="color:#000;">${esc(plan.price)}${esc(plan.period)}</strong>
          </p>
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#919499;">What's included</p>
          <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#313439;line-height:1.8;">
            ${plan.features.map((f) => `<li>${esc(f)}</li>`).join("")}
          </ul>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            ${isEnterprise
              ? "Our team will review your request and reach out within 1 business day to discuss your specific requirements and arrange a demo."
              : "We are onboarding users in small batches to ensure the highest data integrity and personalised support. You will receive a direct invitation as soon as your cohort opens. No payment is required until then."}
          </p>
          ${ctaButton("Explore Public Record Africa", `${SITE_URL}/public-record`)}
          ${signature(env)}
        `),
      }),
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `New ${plan.name} plan enquiry: ${name} <${email}>`,
        html: layout(`New ${esc(plan.name)} Plan Enquiry`, `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Plan", `${esc(plan.name)} (${esc(plan.price)}${esc(plan.period)})`)}
            ${fieldRow("Billing", billing === "annual" ? "Annual" : "Monthly")}
          </table>
          ${timestamp()}
        `),
      }),
    ]), "Failed to process your request. Please try again.");

    await hubspotContact(env, {
      firstname: name.split(" ")[0],
      lastname: name.split(" ").slice(1).join(" "),
      email,
      hs_lead_status: isEnterprise ? "IN_PROGRESS" : "NEW",
      plan_interest: plan.name,
    });
    return response;
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to process your request. Please try again.");
  }
};

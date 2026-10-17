import { sendEmail, sender, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, SITE_URL, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail } from "../_lib";

const TOPICS: Record<string, string> = {
  security: "Cybersecurity (Traverse Security)",
  literacy: "Staff training (Digital Literacy)",
  "think-tank": "Research and policy (Think Tank)",
  "public-record": "Public Record Africa",
  events: "Events and partnerships",
  media: "Media and the podcast",
  general: "Something else",
};

const WINDOWS: Record<string, string> = {
  morning: "Morning, 9:00 AM to 12:00 PM EAT",
  afternoon: "Afternoon, 12:00 PM to 5:00 PM EAT",
  any: "Any time, 9:00 AM to 5:00 PM EAT",
};

/** "2026-10-21" -> "Wednesday, 21 October 2026"; anything that is not a real date comes back empty. */
function readableDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

const p = (html: string) => `<p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">${html}</p>`;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    // Bots get the same success response as people, so they learn nothing
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    if (!email) return fail(400, "A valid email address is required.");
    if (name.length < 2) return fail(400, "Please tell us your name.");

    const date = readableDate(str(body.preferredDate, 10));
    if (!date) return fail(400, "Please choose a preferred date.");
    const window = WINDOWS[str(body.timeWindow, 20)] ?? WINDOWS.any;
    const topic = TOPICS[str(body.topic, 40)] ?? TOPICS.general;
    const organisation = str(body.organisation, 160);
    const phone = str(body.phone, 40);
    const notes = str(body.notes, 2000);
    const firstName = name.split(" ")[0];

    const stored = await store(env, request, "call-request", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      // To the team
      sendEmail(env, {
        from: sender(env, "Traverse Minds"),
        to: notifyTo(env),
        replyTo: email,
        subject: `Call request: ${name}${organisation ? `, ${organisation}` : ""} (${date})`,
        html: layout("New intro call request", `
          ${p(`<strong style="color:#000;">${esc(name)}</strong> would like a 30-minute intro call. They have been told we will confirm a time <strong style="color:#000;">within one working day</strong>, so please send a calendar invitation with a video link.`)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Preferred date", esc(date))}
            ${fieldRow("Preferred time", esc(window))}
            ${fieldRow("Topic", esc(topic))}
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Organisation", esc(organisation))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone))}
            ${fieldRow("What they want to discuss", escBr(notes))}
          </table>
          ${ctaButton(`Reply to ${esc(firstName)}`, `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Your intro call with Traverse Minds Africa")}`)}
          ${timestamp()}
        `),
      }),
      // To the person who asked
      sendEmail(env, {
        to: email,
        replyTo: notifyTo(env),
        subject: "Your intro call with Traverse Minds Africa is being scheduled",
        html: layout("Your call is being scheduled", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(firstName)},</p>
          ${p(`Thank you for asking to speak with <strong style="color:#000;">Traverse Minds Africa</strong>. We have your request and are arranging your introductory call now.`)}
          ${p(`Within <strong style="color:#000;">one working day</strong> you will receive a calendar invitation with the confirmed time and a video link. We will do our best to match the time you asked for:`)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 22px;">
            ${fieldRow("Preferred date", esc(date))}
            ${fieldRow("Preferred time", esc(window))}
            ${fieldRow("Topic", esc(topic))}
          </table>
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#000;letter-spacing:0.4px;text-transform:uppercase;">What to expect</p>
          <ul style="margin:0 0 18px;padding-left:18px;font-size:15px;color:#515459;line-height:1.75;">
            <li>30 minutes with a member of our team</li>
            <li>We listen first: your goals, your risks and what you have already tried</li>
            <li>Practical next steps, with no commitment and no sales pitch</li>
          </ul>
          ${p(`If that time no longer suits you, or there is something we should read before we speak, simply reply to this email.`)}
          ${ctaButton("Explore our work", SITE_URL)}
          ${signature(env)}
        `),
      }),
    ]), "We could not send your request. Please try again, or email us directly.");
  } catch (err) {
    console.error(err);
    return fail(500, "We could not send your request. Please try again, or email us directly.");
  }
};

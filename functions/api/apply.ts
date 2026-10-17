import { sendEmail, notifyTo, layout, fieldRow, signature, timestamp } from "../_email";
import { type Env, esc, escBr, str, validEmail, readBody, isBot, store, deliver, ok, fail, toBase64 } from "../_lib";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES: Record<string, string> = { pdf: "application/pdf", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const name = str(body.name, 120);
    const phone = str(body.phone, 40);
    const role = str(body.role ?? body.position, 160);
    const coverLetter = str(body.coverLetter, 10000);

    if (name.length < 2) return fail(400, "A valid name is required.");
    if (!email) return fail(400, "A valid email address is required.");
    if (!phone || !coverLetter) return fail(400, "Please complete all required fields.");

    // The CV is optional, but if one is sent it must be a real document of a sensible size
    const cv = body.cv instanceof File && body.cv.size > 0 ? body.cv : null;
    let attachment: { filename: string; content: string } | undefined;
    if (cv) {
      const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
      if (!CV_TYPES[ext]) return fail(400, "CV must be a PDF, DOC or DOCX file.");
      if (cv.size > MAX_CV_BYTES) return fail(400, "CV must be 5MB or smaller.");
      const safeName = `${name.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-") || "Applicant"}-CV.${ext}`;
      attachment = { filename: safeName, content: toBase64(await cv.arrayBuffer()) };
    }

    const stored = await store(env, request, "careers-application", { email, name, data: body });

    return deliver(stored, () => Promise.all([
      sendEmail(env, {
        to: notifyTo(env),
        replyTo: email,
        subject: `New Job Application: ${name}${role ? ` (${role})` : ""}`,
        attachments: attachment ? [attachment] : undefined,
        html: layout("New Job Application", `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow("Name", esc(name))}
            ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
            ${fieldRow("Phone", esc(phone))}
            ${fieldRow("Role", esc(role))}
            ${fieldRow("CV", attachment ? `Attached: ${esc(attachment.filename)}` : "Not provided")}
            ${fieldRow("Cover Letter", escBr(coverLetter))}
          </table>
          ${timestamp()}
        `),
      }),
      sendEmail(env, {
        to: email,
        subject: "We've received your application: Traverse Minds Africa",
        html: layout("Application received", `
          <p style="margin:0 0 18px;font-size:16px;color:#313439;line-height:1.6;">Hi ${esc(name.split(" ")[0])},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
            Thank you for applying to <strong style="color:#000;">Traverse Minds Africa</strong>. Our team reviews every
            application and will contact you if your experience matches a current or upcoming role.
          </p>
          ${signature(env)}
        `),
      }),
    ]), "Failed to submit. Please try again.");
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to submit. Please try again.");
  }
};

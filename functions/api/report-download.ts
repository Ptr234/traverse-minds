import { sendEmail, notifyTo, layout, fieldRow, ctaButton, signature, timestamp } from "../_email";
import { type Env, esc, str, validEmail, readBody, isBot, store, deliver, ok, fail, hubspotContact, toBase64 } from "../_lib";

const MAX_PDF_BYTES = 10 * 1024 * 1024;

/**
 * Only our own reports may be emailed: PDFs under /PublicDocuments on this site, or files in our
 * Sanity project. Anything else is refused, so the form cannot be used to mail arbitrary files.
 */
function resolveReportUrl(reportUrl: string, origin: string): string | null {
  if (reportUrl.startsWith("/PublicDocuments/") && reportUrl.toLowerCase().endsWith(".pdf") && !reportUrl.includes("..")) {
    return `${origin}${reportUrl}`;
  }
  if (/^https:\/\/cdn\.sanity\.io\/files\/f5v11nkd\/production\/[\w-]+\.pdf(\?.*)?$/.test(reportUrl)) {
    return reportUrl;
  }
  return null;
}

const pdfFilename = (title: string) =>
  `${title.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-") || "Report"}-Traverse-Think-Tank.pdf`;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readBody(request);
    if (isBot(body)) return ok();

    const email = validEmail(body.email);
    const reportTitle = str(body.reportTitle, 200);
    const reportUrl = str(body.reportUrl, 500);
    if (!email) return fail(400, "A valid email address is required.");
    if (!reportTitle || !reportUrl) return fail(400, "No report selected.");

    const origin = new URL(request.url).origin;
    const pdfUrl = resolveReportUrl(reportUrl, origin);
    if (!pdfUrl) return fail(400, "That report is not available for download.");

    const stored = await store(env, request, "report-download", { email, data: { email, reportTitle, reportUrl } });

    const response = await deliver(stored, async () => {
      const pdf = await fetch(pdfUrl);
      if (!pdf.ok) throw new Error(`PDF fetch failed: ${pdf.status}`);
      const buffer = await pdf.arrayBuffer();
      // Too large to attach: send the link only
      const attachments = buffer.byteLength <= MAX_PDF_BYTES ? [{ filename: pdfFilename(reportTitle), content: toBase64(buffer) }] : undefined;

      await Promise.all([
        sendEmail(env, {
          to: email,
          subject: `Your Traverse Think Tank report: ${reportTitle}`,
          attachments,
          html: layout("Your report is ready", `
            <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
              <strong style="color:#000;">${esc(reportTitle)}</strong>, Traverse Think Tank.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#515459;line-height:1.75;">
              Thank you for your interest in our research. ${attachments ? "You will find the PDF attached to this email. If you have trouble opening it, use the button below." : "Use the button below to download it."}
            </p>
            ${ctaButton("Download the Report", pdfUrl)}
            ${signature(env)}
          `),
        }),
        sendEmail(env, {
          to: notifyTo(env),
          replyTo: email,
          subject: `Report download request: ${email}`,
          html: layout("New Report Download Request", `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${fieldRow("Email", `<a href="mailto:${esc(email)}" style="color:#ff4c00;text-decoration:none;">${esc(email)}</a>`)}
              ${fieldRow("Report", esc(reportTitle))}
            </table>
            ${timestamp()}
          `),
        }),
      ]);
    }, "Failed to process your request. Please try again.");

    await hubspotContact(env, { email, hs_lead_status: "SUBSCRIBER" });
    return response;
  } catch (err) {
    console.error(err);
    return fail(500, "Failed to process your request. Please try again.");
  }
};

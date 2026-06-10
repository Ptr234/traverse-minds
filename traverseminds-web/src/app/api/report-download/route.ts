import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import {
  sendEmail,
  buildReportDownloadConfirmationHtml,
  buildReportDownloadNotificationHtml,
  NOTIFY_TO,
} from "@/lib/email";

const SITE_URL = "https://traverseminds.ug";

async function fetchPdfBuffer(reportUrl: string): Promise<Buffer> {
  if (reportUrl.startsWith("http")) {
    const res = await fetch(reportUrl);
    if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  // Local file under /public
  const filePath = path.join(process.cwd(), "public", decodeURIComponent(reportUrl));
  return readFile(filePath);
}

function pdfFilename(reportTitle: string): string {
  return (
    reportTitle
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") + "-Traverse-Think-Tank.pdf"
  );
}

export async function POST(req: NextRequest) {
  try {
    const { email, reportTitle, reportUrl } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!reportTitle || !reportUrl || typeof reportUrl !== "string") {
      return NextResponse.json(
        { error: "No report selected." },
        { status: 400 }
      );
    }

    const absoluteUrl = reportUrl.startsWith("http")
      ? reportUrl
      : `${SITE_URL}${reportUrl}`;

    const pdfBuffer = await fetchPdfBuffer(reportUrl);

    await Promise.all([
      sendEmail({
        to: email,
        subject: `Your Traverse Think Tank report: ${reportTitle}`,
        html: buildReportDownloadConfirmationHtml(absoluteUrl, reportTitle),
        attachments: [{ filename: pdfFilename(reportTitle), content: pdfBuffer }],
      }),
      sendEmail({
        to: NOTIFY_TO,
        subject: `Report download request: ${email}`,
        html: buildReportDownloadNotificationHtml(email, reportTitle),
        replyTo: email,
      }),
    ]);

    if (process.env.HUBSPOT_API_KEY) {
      try {
        await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            properties: {
              email,
              hs_lead_status: "SUBSCRIBER",
            },
          }),
        });
      } catch (err) {
        console.error("HubSpot report download error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report download error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

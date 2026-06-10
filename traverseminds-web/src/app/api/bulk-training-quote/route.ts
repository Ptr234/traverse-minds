import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  buildBulkTrainingConfirmationHtml,
  buildBulkTrainingNotificationHtml,
  NOTIFY_TO,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, organisation, email, phone, teamSize, sector, deliveryFormat, timeline, message } = body;

    if (!name || String(name).trim().length < 2) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!organisation || !teamSize || !sector || !deliveryFormat || !message) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const cleanName = String(name).trim();
    const cleanOrg = String(organisation).trim();

    await Promise.all([
      sendEmail({
        to: email,
        subject: `Quote request received — Bulk Training for ${cleanOrg}`,
        html: buildBulkTrainingConfirmationHtml({
          name: cleanName,
          organisation: cleanOrg,
          teamSize,
          sector,
          deliveryFormat,
          timeline: timeline || undefined,
        }),
      }),
      sendEmail({
        to: NOTIFY_TO,
        subject: `Bulk Training Quote: ${cleanOrg} (${teamSize} — ${deliveryFormat})`,
        html: buildBulkTrainingNotificationHtml({
          name: cleanName,
          organisation: cleanOrg,
          email,
          phone: phone || undefined,
          teamSize,
          sector,
          deliveryFormat,
          timeline: timeline || undefined,
          message,
        }),
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
              firstname: cleanName.split(" ")[0],
              lastname: cleanName.split(" ").slice(1).join(" ") || "",
              email,
              phone: phone || "",
              company: cleanOrg,
              hs_lead_status: "IN_PROGRESS",
            },
          }),
        });
      } catch (err) {
        console.error("HubSpot bulk training error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bulk training quote error:", error);
    return NextResponse.json(
      { error: "Failed to submit your request. Please try again." },
      { status: 500 }
    );
  }
}

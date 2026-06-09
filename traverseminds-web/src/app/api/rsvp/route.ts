import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, organisation, dietary, eventTitle } = await req.json();

    if (!name || !email || !organisation) {
      return NextResponse.json(
        { error: "Name, email, and organisation are required." },
        { status: 400 }
      );
    }

    // Send confirmation + ICS calendar invite via Resend
    if (process.env.RESEND_API_KEY) {
      const {
        sendEmail,
        buildRsvpNotificationHtml,
        buildRsvpConfirmationHtml,
        NOTIFY_TO,
      } = await import("@/lib/email");

      await sendEmail({
        to: NOTIFY_TO,
        subject: `New RSVP: ${name} for ${eventTitle}`,
        html: buildRsvpNotificationHtml({ name, email, organisation, eventTitle, dietary }),
        replyTo: email,
      });

      await sendEmail({
        to: email,
        subject: `You're registered: ${eventTitle} — Traverse Minds Africa`,
        html: buildRsvpConfirmationHtml(name, eventTitle),
      });
    }

    // Create HubSpot contact
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
              firstname: name.split(" ")[0],
              lastname: name.split(" ").slice(1).join(" ") || "",
              email,
              company: organisation,
              hs_lead_status: "EVENT_RSVP",
            },
          }),
        });
      } catch (err) {
        console.error("HubSpot RSVP error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

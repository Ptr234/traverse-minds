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
      const { sendEmail } = await import("@/lib/email");

      // Notify the team
      await sendEmail({
        to: process.env.EMAIL_FROM || "traversemindsug@gmail.com",
        subject: `New RSVP: ${name} for ${eventTitle}`,
        html: `
          <h2>New Event RSVP</h2>
          <p><strong>Event:</strong> ${eventTitle}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organisation:</strong> ${organisation}</p>
          <p><strong>Dietary:</strong> ${dietary || "None specified"}</p>
        `,
        replyTo: email,
      });

      // Confirmation to attendee
      await sendEmail({
        to: email,
        subject: `You're registered: ${eventTitle} — Traverse Minds Africa`,
        html: `
          <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #0D3B2E; font-size: 24px;">You're registered, ${name}!</h2>
            <p style="color: #444441; font-size: 16px; line-height: 1.6;">
              Thank you for registering for <strong>${eventTitle}</strong>.
              We'll send you a reminder with full event details closer to the date.
            </p>
            <p style="color: #444441; font-size: 16px; line-height: 1.6;">
              If you have any questions, reply to this email or reach us on WhatsApp.
            </p>
            <hr style="border: none; border-top: 1px solid #D3D1C7; margin: 24px 0;" />
            <p style="color: #888780; font-size: 13px;">
              Traverse Minds Africa · Kampala, Uganda<br />
              Built for Africa · Driven by Evidence
            </p>
          </div>
        `,
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

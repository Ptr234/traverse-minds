import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Send double opt-in confirmation via Resend (if API key is set)
    if (process.env.RESEND_API_KEY) {
      const { sendEmail } = await import("@/lib/email");

      await sendEmail({
        to: email,
        subject: "Confirm your subscription — Traverse Minds",
        html: `
          <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #0D3B2E; font-size: 24px;">Confirm your subscription</h2>
            <p style="color: #444441; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to the Traverse Minds newsletter.
              Please confirm your email address by clicking the button below.
            </p>
            <div style="margin: 24px 0;">
              <a href="https://traverseminds.ug/?confirmed=true"
                 style="display: inline-block; background: #0D3B2E; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Confirm Subscription
              </a>
            </div>
            <p style="color: #888780; font-size: 13px;">
              If you did not subscribe, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #D3D1C7; margin: 24px 0;" />
            <p style="color: #888780; font-size: 13px;">
              Traverse Minds UG · Kampala, Uganda<br />
              Built for Africa · Driven by Evidence
            </p>
          </div>
        `,
      });
    }

    // Add to HubSpot as a contact (if API key is set)
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
        console.error("HubSpot newsletter error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

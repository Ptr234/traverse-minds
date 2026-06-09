import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, organisation, email, phone, serviceType, message, division } =
      body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send notification email via Resend (if API key is set)
    if (process.env.RESEND_API_KEY) {
      const { sendEmail, sendAutoReply } = await import("@/lib/email");

      // Notify the team
      await sendEmail({
        to: process.env.EMAIL_FROM || "traversemindsug@gmail.com",
        subject: `New ${division || "general"} enquiry from ${name}`,
        html: `
          <h2>New Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organisation:</strong> ${organisation || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Division:</strong> ${division || "General"}</p>
          <p><strong>Service:</strong> ${serviceType || "N/A"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        replyTo: email,
      });

      // Auto-reply to enquirer
      await sendAutoReply({ to: email, name, division });
    }

    // Create HubSpot contact + deal (if API key is set)
    if (process.env.HUBSPOT_API_KEY) {
      try {
        const hubspotRes = await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
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
                phone: phone || "",
                company: organisation || "",
                hs_lead_status: "NEW",
                message,
              },
            }),
          }
        );

        if (!hubspotRes.ok) {
          console.error("HubSpot contact creation failed:", await hubspotRes.text());
        }
      } catch (hubspotError) {
        console.error("HubSpot error:", hubspotError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

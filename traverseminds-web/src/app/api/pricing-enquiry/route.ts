import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  buildPricingEnquiryConfirmationHtml,
  buildPricingEnquiryNotificationHtml,
  NOTIFY_TO,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, planName, planPrice, planFeatures, billing } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!planName || !planPrice) {
      return NextResponse.json({ error: "Plan details are missing." }, { status: 400 });
    }

    await Promise.all([
      sendEmail({
        to: email,
        subject:
          planName === "Enterprise"
            ? "Your Enterprise enquiry — Public Record Africa"
            : `You're on the list: ${planName} Plan — Public Record Africa`,
        html: buildPricingEnquiryConfirmationHtml({
          name: name.trim(),
          planName,
          planPrice,
          planFeatures: planFeatures ?? [],
          billing: billing ?? "monthly",
        }),
      }),
      sendEmail({
        to: NOTIFY_TO,
        subject: `New ${planName} plan enquiry: ${name.trim()} <${email}>`,
        html: buildPricingEnquiryNotificationHtml({
          name: name.trim(),
          email,
          planName,
          planPrice,
          billing: billing ?? "monthly",
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
              firstname: name.trim().split(" ")[0],
              lastname: name.trim().split(" ").slice(1).join(" ") || "",
              email,
              hs_lead_status: planName === "Enterprise" ? "IN_PROGRESS" : "NEW",
              plan_interest: planName,
            },
          }),
        });
      } catch (err) {
        console.error("HubSpot pricing enquiry error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pricing enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

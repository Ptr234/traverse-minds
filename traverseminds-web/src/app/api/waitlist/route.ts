import { NextResponse } from "next/server";
import {
  sendEmail,
  buildWaitlistNotificationHtml,
  buildWaitlistConfirmationHtml,
  NOTIFY_TO,
} from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organisation, persona, countryInterest, message } = body;

    if (!name || !email || !persona) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendEmail({
      to: NOTIFY_TO,
      subject: `New Public Record Waitlist Entry: ${name}`,
      html: buildWaitlistNotificationHtml({ name, email, organisation, persona, countryInterest, message }),
      replyTo: email,
    });

    await sendEmail({
      to: email,
      subject: "You're on the list: Public Record Africa",
      html: buildWaitlistConfirmationHtml(name),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to process waitlist entry" }, { status: 500 });
  }
}

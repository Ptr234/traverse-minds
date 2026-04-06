import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organisation, persona, countryInterest, message } = body;

    if (!name || !email || !persona) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Send internal notification email
    await resend.emails.send({
      from: "Traverse Minds <hello@traverseminds.ug>",
      to: "hello@traverseminds.ug",
      subject: `New Public Record Waitlist Entry: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Organisation: ${organisation || "N/A"}
        Persona: ${persona}
        Countries: ${countryInterest ? countryInterest.join(", ") : "None specified"}
        Message: ${message || "No message provided"}
      `,
    });

    // 2. Send auto-reply to user
    await resend.emails.send({
      from: "Traverse Minds <hello@traverseminds.ug>",
      to: email,
      subject: "You're on the list: Public Record Africa",
      text: `
        Hello ${name},

        Thank you for joining the waitlist for Public Record Africa — Africa's AI-powered public document platform.

        We are currently in the private beta phase, indexing thousands of records across Uganda, Kenya, Tanzania, Rwanda, and Burundi. We will notify you as soon as your account is ready for early access.

        In the meantime, feel free to follow our updates on LinkedIn or visit our website.

        Best regards,
        The Traverse Minds Team
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to process waitlist entry" },
      { status: 500 }
    );
  }
}

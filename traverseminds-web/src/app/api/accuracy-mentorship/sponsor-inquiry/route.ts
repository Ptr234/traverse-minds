import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, sponsorshipLevel, message } = body;

    if (!name || !email || !organization) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailContent = `
New Sponsorship Inquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Organization: ${organization}
Sponsorship Level: ${sponsorshipLevel || "Not specified"}

Message:
${message || "No additional message"}

---
This inquiry was submitted through the Accuracy Mentorship Program website.
    `;

    await resend.emails.send({
      from: "noreply@traverseminds.ug",
      to: "petergra38@gmail.com",
      subject: `Sponsorship Inquiry - ${sponsorshipLevel || "Custom"} Level from ${organization}`,
      text: emailContent,
      replyTo: email,
    });

    return Response.json(
      { success: true, message: "Sponsorship inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sponsorship submission error:", error);
    return Response.json(
      { error: "Failed to submit sponsorship inquiry" },
      { status: 500 }
    );
  }
}

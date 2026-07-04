import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      school,
      ageGroup,
      motivation,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !school || !ageGroup || !motivation) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send confirmation email to student
    await resend.emails.send({
      from: "noreply@traverseminds.org",
      to: email,
      subject: "Your Accuracy Mentorship Program Application Received",
      html: `
        <h2>Welcome to the Accuracy Mentorship Program!</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for applying to the Accuracy Mentorship Program. We've received your application and appreciate your interest in joining us on this journey of character formation.</p>

        <h3>What's Next?</h3>
        <p>Our team will review your application and contact you within 5 business days with next steps. In the meantime, if you have any questions, please don't hesitate to reach out.</p>

        <p><strong>Application Details:</strong></p>
        <ul>
          <li>Name: ${firstName} ${lastName}</li>
          <li>School: ${school}</li>
          <li>Age Group: ${ageGroup}</li>
        </ul>

        <p>Remember: "Accuracy is the quiet discipline of getting it right when no one's watching."</p>

        <p>Best regards,<br/>Traverse Minds Africa - Accuracy Mentorship Program</p>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: "noreply@traverseminds.org",
      to: "petergra38@gmail.com",
      subject: `New Student Application: ${firstName} ${lastName}`,
      html: `
        <h2>New Student Application Received</h2>

        <h3>Student Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>School:</strong> ${school}</li>
          <li><strong>Age Group:</strong> ${ageGroup}</li>
        </ul>

        <h3>Motivation:</h3>
        <p>${motivation.replace(/\n/g, "<br/>")}</p>

        <p>Please review and follow up with this applicant.</p>
      `,
    });

    return Response.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Student registration error:", error);
    return Response.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}

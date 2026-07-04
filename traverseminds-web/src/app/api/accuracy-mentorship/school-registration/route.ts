import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      schoolName,
      principalName,
      email,
      phone,
      address,
      studentCount,
      interest,
    } = await request.json();

    // Validate required fields
    if (
      !schoolName ||
      !principalName ||
      !email ||
      !phone ||
      !address ||
      !studentCount ||
      !interest
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send confirmation email to school
    await resend.emails.send({
      from: "noreply@traverseminds.org",
      to: email,
      subject: "Accuracy Mentorship Program - School Partnership Registration",
      html: `
        <h2>Welcome to the Accuracy Mentorship Program!</h2>
        <p>Dear ${principalName},</p>
        <p>Thank you for registering ${schoolName} for the Accuracy Mentorship Program. We're excited about the possibility of partnering with your institution to bring character formation to your students.</p>

        <h3>What's Next?</h3>
        <p>Our partnership team will contact you within 5 business days to discuss implementation options, timelines, and how we can customize the program for your school's needs.</p>

        <h3>School Information:</h3>
        <ul>
          <li><strong>Institution:</strong> ${schoolName}</li>
          <li><strong>Students (Ages 14-25):</strong> ${studentCount}</li>
          <li><strong>Location:</strong> ${address}</li>
        </ul>

        <p>In the meantime, feel free to review the full curriculum framework and reach out if you have any questions.</p>

        <p>Best regards,<br/>Traverse Minds Africa - Accuracy Mentorship Program</p>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: "noreply@traverseminds.org",
      to: "petergra38@gmail.com",
      subject: `New School Partnership: ${schoolName}`,
      html: `
        <h2>New School Partnership Registration</h2>

        <h3>School Information:</h3>
        <ul>
          <li><strong>School Name:</strong> ${schoolName}</li>
          <li><strong>Principal/Head:</strong> ${principalName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Target Students (14-25):</strong> ${studentCount}</li>
        </ul>

        <h3>Interest/Participation Plan:</h3>
        <p>${interest.replace(/\n/g, "<br/>")}</p>

        <p>Please review and schedule a partnership call with this school.</p>
      `,
    });

    return Response.json(
      { success: true, message: "School registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("School registration error:", error);
    return Response.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}

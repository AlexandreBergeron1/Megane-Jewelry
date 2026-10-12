import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recaptchaToken, firstName, lastName, email, requestType, message } = body;

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Send email to your inbox
    const { data, error } = await resend.emails.send({
  from: "noreply@resend.dev",
  to: "megane.jewelry@gmail.com",
  replyTo: email,
  subject: `New Contact Form Submission - ${requestType}`,
  html: `<p>New message from ${firstName} ${lastName}</p>
         <p>${message}</p>`,
});

if (error) {
  console.error("Resend error:", error);
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

console.log("Email sent:", data);

    // Send confirmation to user
    await resend.emails.send({
      from: "noreply@resend.dev",
      to: email,
      subject: "We received your message",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Thank you for contacting us!</h2>
          <p>Hi ${firstName},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
        </div>
      `,
    });

    console.log("Emails sent successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
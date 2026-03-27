import { NextRequest, NextResponse } from 'next/server';
const escapeHtml = (text: string): string =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const adminEmailHtml = (name: string, email: string, message: string) => `
  <h2>New Contact Submission</h2>
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <hr />
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
`;

const autoReplyHtml = (name: string) => `
  <h2>Thanks for contacting ClickMasters</h2>
  <p>Hi ${escapeHtml(name)},</p>
  <p>We received your message and will get back to you within 24 hours.</p>
  <p>- ClickMasters Team</p>
`;

export async function POST(req: NextRequest) {
  try {
    const { default: nodemailer } = await import('nodemailer');
    // Parse the request body
    const body = await req.json();
    const { name, email, message, company, phone, services, budget } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: { rejectUnauthorized: true },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Prepare email content with additional fields if provided
    let fullMessage = message;
    if (company || phone || services || budget) {
      fullMessage += '\n\n--- Additional Information ---';
      if (company) fullMessage += `\nCompany: ${company}`;
      if (phone) fullMessage += `\nPhone: ${phone}`;
      if (services) fullMessage += `\nServices Interested: ${services}`;
      if (budget) fullMessage += `\nBudget: ${budget}`;
    }

    // Send email to admin
    const adminMailOptions = {
      from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_MAIL,
      replyTo: email,
      subject: `ClickMasters Form Submission from ${name}`,
      html: adminEmailHtml(name, email, fullMessage),
    };

    // Send auto-reply to user
    const userMailOptions = {
      from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
      to: email,
      subject: 'Thank You for Contacting ClickMasters',
      html: autoReplyHtml(name),
    };

    // Send both emails
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Admin email sent:', adminInfo.messageId);
    console.log('Auto-reply sent:', userInfo.messageId);

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        success: true 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // More detailed error response
    let errorMessage = 'Failed to send message';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Unable to connect to email server. Please try again later.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}

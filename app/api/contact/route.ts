// app/api/contact/route.ts (for Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to escape HTML
const escapeHtml = (text: string): string => {
  // Server-side HTML escape (no document available)
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;');
};

// Email template function
const generateEmailTemplate = (name: string, email: string, message: string) => {
  const currentDate = new Date().toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ClickMasters Form Submission</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .info-card {
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 20px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .info-header {
          background: #f3f4f6;
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
          font-weight: bold;
          color: #f97316;
        }
        .info-body {
          padding: 20px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          color: #4b5563;
          margin-bottom: 5px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          color: #1f2937;
          font-size: 16px;
          word-wrap: break-word;
        }
        .message-box {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin-top: 10px;
        }
        .timestamp {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          font-size: 12px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        @media (max-width: 600px) {
          .content {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📬 ClickMasters Form Submission</h2>
          <p>From ClickMasters Website</p>
        </div>
        
        <div class="content">
          <div class="info-card">
            <div class="info-header">
              📋 Submission Details
            </div>
            <div class="info-body">
              <div class="field">
                <div class="field-label">👤 Full Name</div>
                <div class="field-value">${escapeHtml(name)}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email Address</div>
                <div class="field-value">${escapeHtml(email)}</div>
              </div>
              
              <div class="field">
                <div class="field-label">🕐 Submitted On</div>
                <div class="field-value">${currentDate}</div>
              </div>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-header">
              💬 Message
            </div>
            <div class="info-body">
              <div class="message-box">
                ${escapeHtml(message).replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the contact form on ClickMasters website.</p>
          <p>To reply directly to this inquiry, please use the reply-to address: ${escapeHtml(email)}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Auto-reply template for the user
const generateAutoReplyTemplate = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting ClickMasters</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 30px;
        }
        .message-box {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f59e0b;
        }
        .button {
          display: inline-block;
          background: #f97316;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          font-size: 12px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Contacting Us! 🎉</h2>
        </div>
        
        <div class="content">
          <p>Dear ${escapeHtml(name)},</p>
          
          <p>Thank you for reaching out to <strong>ClickMasters</strong>. We have received your message and appreciate you taking the time to contact us.</p>
          
          <div class="message-box">
            <strong>What happens next?</strong><br>
            Our team will review your inquiry and get back to you within <strong>24 hours</strong>. We're committed to providing you with the best possible assistance.
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>📱 Call us at: +92 333-1116842</li>
            <li>💬 WhatsApp us at: +92 332-5394285</li>
            <li>🌐 Visit our website: <a href="https://clickmasters.pk">clickmasters.pk</a></li>
          </ul>
          
          <p>We look forward to assisting you with your project!</p>
          
          <p>Best regards,<br>
          <strong>ClickMasters Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} ClickMasters. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(req: NextRequest) {
  try {
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
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
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

    // 1. Send email to the admin/receiver
    const adminMailOptions = {
      from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_MAIL,
      replyTo: email,
      subject: `ClickMasters Form Submission from ${name}`,
      html: generateEmailTemplate(name, email, fullMessage),
      headers: {
        'X-Submitter-Email': email,
        'X-Submitter-Name': name,
        Priority: 'normal',
      },
    };

    // 2. Send auto-reply to the user
    const userMailOptions = {
      from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
      to: email,
      subject: 'Thank You for Contacting ClickMasters',
      html: generateAutoReplyTemplate(name),
      headers: {
        'X-Auto-Reply': 'true',
      },
    };

    // Send both emails
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log('Admin email sent:', adminInfo.messageId);
    console.log('Auto-reply sent:', userInfo.messageId);

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        success: true,
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
        success: false,
      },
      { status: 500 }
    );
  }
}

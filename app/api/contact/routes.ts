// import { NextRequest, NextResponse } from 'next/server';
// import sendEmail from '@/src/utils/sendEmail'; // Adjust path based on your structure

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const { name, email, company, phone, message, services, budget } = data;

//     // Basic validation
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { success: false, message: 'Name, email and message are required fields' },
//         { status: 400 }
//       );
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid email address' },
//         { status: 400 }
//       );
//     }

//     // Create HTML email body for admin
//     const adminEmailContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>New Contact Form Submission</title>
//       </head>
//       <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
//           <h1 style="color: white; margin: 0; font-size: 28px;">✨ New Contact Form Submission</h1>
//           <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">A new inquiry has been received from your website</p>
//         </div>
        
//         <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
//           <div style="margin-bottom: 30px;">
//             <h2 style="color: #f97316; margin-top: 0; font-size: 20px;">📋 Contact Details</h2>
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold; width: 120px;">Name:</td>
//                 <td style="padding: 12px 0;">${escapeHtml(name)}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold;">Email:</td>
//                 <td style="padding: 12px 0;">
//                   <a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${escapeHtml(email)}</a>
//                 </td>
//               </tr>
//               ${company ? `
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold;">Company:</td>
//                 <td style="padding: 12px 0;">${escapeHtml(company)}</td>
//               </tr>
//               ` : ''}
//               ${phone ? `
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold;">Phone:</td>
//                 <td style="padding: 12px 0;">
//                   <a href="tel:${phone}" style="color: #f97316; text-decoration: none;">${escapeHtml(phone)}</a>
//                 </td>
//               </tr>
//               ` : ''}
//               ${services ? `
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold;">Services Required:</td>
//                 <td style="padding: 12px 0;">${escapeHtml(services)}</td>
//               </tr>
//               ` : ''}
//               ${budget ? `
//               <tr style="border-bottom: 1px solid #e5e7eb;">
//                 <td style="padding: 12px 0; font-weight: bold;">Budget Range:</td>
//                 <td style="padding: 12px 0;">${escapeHtml(budget)}</td>
//               </tr>
//               ` : ''}
//             </table>
//           </div>

//           <div style="margin-bottom: 30px;">
//             <h2 style="color: #f97316; margin-top: 0; font-size: 20px;">💬 Message</h2>
//             <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
//               <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
//             </div>
//           </div>

//           <div style="background: #fef9e8; padding: 15px; border-radius: 8px; text-align: center;">
//             <p style="margin: 0; font-size: 14px; color: #666;">
//               <strong>📅 Received:</strong> ${new Date().toLocaleString()}
//             </p>
//           </div>
//         </div>

//         <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
//           <p style="color: #9ca3af; font-size: 12px;">
//             This is an automated message from your website contact form.
//           </p>
//         </div>
//       </body>
//       </html>
//     `;

//     // Send email using your utility
//     await sendEmail({
//       userEmail: email,
//       subject: `📧 New Contact Form: ${name}${company ? ` from ${company}` : ''}`,
//       html: adminEmailContent,
//     });

//     // Optional: Send auto-reply to user
//     const userAutoReply = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Thank You for Contacting Click Master Projects</title>
//       </head>
//       <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 30px; border-radius: 12px; text-align: center;">
//           <h1 style="color: white; margin: 0;">Thank You for Contacting Us! 🎉</h1>
//         </div>
        
//         <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
//           <p style="font-size: 18px; margin-bottom: 20px;">Dear ${escapeHtml(name)},</p>
          
//           <p>Thank you for reaching out to <strong>Click Master Projects</strong>. We have received your inquiry and our team will get back to you within 24 hours.</p>
          
//           <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #f97316; margin-top: 0;">Your Message Summary:</h3>
//             <p><strong>Service:</strong> ${services || 'General Inquiry'}</p>
//             <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
//           </div>
          
//           <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
//           <p style="color: #666; font-size: 14px;">
//             Best regards,<br>
//             <strong>Click Master Projects Team</strong>
//           </p>
//         </div>
//       </body>
//       </html>
//     `;

//     // Uncomment to send auto-reply
//     // await sendEmail({
//     //   userEmail: email,
//     //   subject: 'Thank You for Contacting Click Master Projects',
//     //   html: userAutoReply,
//     // });

//     return NextResponse.json({
//       success: true,
//       message: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.',
//     }, { status: 200 });

//   } catch (error: any) {
//     console.error('Contact form error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to send message. Please try again later or contact us directly.',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // Helper function to escape HTML
// function escapeHtml(text: string): string {
//   const htmlEntities: { [key: string]: string } = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#39;',
//   };
//   return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
// }
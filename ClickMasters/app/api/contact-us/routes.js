// controllers/contactController.js
const sendEmail = require('../../.././src/utils/sendEmail');

const contactController = async (req, res) => {
  try {
 

    // 1. Extract form data
    const { name, email, company, phone, message ,  services,
    budget} = req.body;

    // Basic validation (optional but recommended)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required fields'
      });
    }

    // 2. Create nice HTML email body
    const emailContent = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #f97316; margin-bottom: 24px;">ERP Support / Sales Inquiry</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #444;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Email:</td>
            <td style="padding: 8px 0;">${email}</td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Company:</td>
            <td style="padding: 8px 0;">${company}</td>
          </tr>` : ''}
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Phone:</td>
            <td style="padding: 8px 0;">${phone}</td>
          </tr>` : ''}


           ${services ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Services Required:</td>
            <td style="padding: 8px 0;">${services}</td>
          </tr>` : ''}


           ${budget ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444;">Budget:</td>
            <td style="padding: 8px 0;">${budget}</td>
          </tr>` : ''}

          

          
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #444; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #777; font-size: 13px;">
          This message was sent from the website contact form.
        </p>
      </div>
    `;

    // 3. Send email – pass user's email so replies go back to them
    await sendEmail({
      userEmail: email,                    // used for replyTo
      subject: `New Inquiry from ${name}${company ? ` (${company})` : ''}`,
      html: emailContent
    });

    // 4. Success response to frontend
    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message   // only in development – remove in production
    });
  }
};

module.exports = contactController;
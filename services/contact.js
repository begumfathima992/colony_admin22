// services/contactServices.js
import ContactModel from '../models/contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ... existing imports and transporter setup

class ContactServices {
  async saveContact(req, res) {
    try {
      const { name, email, subject, message, userType } = req.body;

      // 1. Save to Database
      const newContact = await ContactModel.create({
        name, email, subject, message, userType,
      });

      // 2. Prepare & Send Email
    // 2. Prepare & Send Email
      const mailOptions = {
        from: `"Colony Admin System" <${process.env.EMAIL_USER}>`,
        replyTo: email, // Click 'Reply' in Gmail to respond directly to the user
        to: process.env.EMAIL_USER,
        subject: `[New Inquiry] ${subject} | ${userType}`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f9; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e1e8ed;">
              
              <div style="background-color: #1a73e8; padding: 25px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">New Contact Submission</h1>
              </div>

              <div style="padding: 30px; color: #3c4043;">
                <p style="font-size: 16px; line-height: 1.5;">You have received a new message from the <strong>${userType}</strong> portal. Details are provided below:</p>
                
                <div style="margin: 25px 0; padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #1a73e8;">
                  <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email}</a></p>
                  <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 0;"><strong>Role:</strong> ${userType}</p>
                </div>

                <div style="margin-top: 25px;">
                  <p style="font-weight: bold; margin-bottom: 10px; color: #1a73e8;">Message:</p>
                  <div style="padding: 15px; background-color: #ffffff; border: 1px solid #e1e8ed; border-radius: 4px; font-style: italic; color: #555; line-height: 1.6;">
                    "${message}"
                  </div>
                </div>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e1e8ed;">
                <p style="font-size: 12px; color: #70757a; margin: 0;">
                  This is an automated notification from your Colony Admin Dashboard.<br>
                  © 2026 Paprika Ventures
                </p>
              </div>
            </div>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);

      // CRITICAL: This is the structure the frontend needs
      return res.status(200).json({
        success: true,
        message: 'Thank you for contacting us. Your inquiry has been successfully submitted, and our support team will reach out to you shortly.',
        data: newContact,
      });

    } catch (error) {
      console.error('Contact Service Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process request: ' + error.message,
      });
    }
  }
}
// ... export

const contactServicesObj = new ContactServices();
export default contactServicesObj;

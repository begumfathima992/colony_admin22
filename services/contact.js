import ContactModel from '../models/contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// 1. Setup the transporter using your App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // ziggy123@gmail.com
        pass: process.env.EMAIL_PASS  // waez ywmo khhs malb
    }
});

class ContactServices {
    async saveContact(req, res) {
        try {
            const { name, email, subject, message, userType } = req.body;

            // 2. Save to Database
            const newContact = await ContactModel.create({
                name,
                email,
                subject,
                message,
                userType
            });

            // 3. Prepare Email Options
            const mailOptions = {
                from: `"${name}" <${email}>`,
                to: process.env.ADMIN_EMAIL, // support@paprikaventures.com
                subject: `[${userType}] ${subject}`,
                text: `Message: ${message}\n\nFrom: ${name} (${email})`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #333;">New Contact Inquiry</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>User Type:</strong> ${userType}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <hr />
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </div>
                `
            };

            // 4. Send the Email
            await transporter.sendMail(mailOptions);

            return res.status(200).json({ 
                message: "Message saved and email sent successfully", 
                data: newContact, 
                statusCode: 200, 
                success: true 
            });
            
        } catch (error) {
            console.error("Contact Service Error:", error);
            return res.status(500).json({ 
                message: "Failed to process request: " + error.message, 
                statusCode: 500, 
                success: false 
            });
        }
    }
}

const contactServicesObj = new ContactServices();
export default contactServicesObj;
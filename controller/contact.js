import Joi from "joi";
import contactServicesObj from '../services/contact.js';

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    userType: Joi.string().valid('User', 'Developer').optional()
});

class ContactController {
    async submitContact(req, res) {
        try {
            const { error } = contactSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ 
                    message: error?.details[0]?.message, 
                    statusCode: 400, 
                    success: false 
                });
            }
            await contactServicesObj.saveContact(req, res);
        } catch (error) {
            return res.status(500).json({ 
                message: error?.message, 
                statusCode: 500, 
                success: false 
            });
        }
    }
}
const ContactControllerObj = new ContactController();
export default ContactControllerObj;
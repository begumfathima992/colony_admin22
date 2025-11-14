import userSchemaObj from "../helper/validator/user";
import userServicesObj from "../services/user";
import Joi from "joi";


const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
}

class userController {
    async getUser(req, res) {
        try {
            let { error } = userSchemaObj.validate(req.body, options)
            if (error) {
                return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
            }
            await userServicesObj?.getUser(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
import userSchema from "../helper/validator/user.js";
import Joi from "joi";
import userServicesObj from '../services/user.js'

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
}

class userController {
    async getUser(req, res) {
        try {
            let { error } = userSchema.validate(req.query, options)
            if (error) {
                return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
            }
            await userServicesObj?.getUser(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
const UserControllerObj = new userController()
export default UserControllerObj

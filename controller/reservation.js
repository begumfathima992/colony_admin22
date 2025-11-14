import reservationSchema, { reservation_byIdSchema } from "../helper/validator/reservation.js";
import reservationServicesObj from "../services/reservation.js";

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
}


class reservationController {
    async get_all(req, res) {
        try {
            let { error } = reservationSchema.validate(req.query, options)
            if (error) {
                return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
            }
            await reservationServicesObj.get_all(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
    
    async get_by_user_id(req, res) {
        try {
            let { error } = reservation_byIdSchema.validate(req.query, options)
            if (error) {
                return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
            }
            await reservationServicesObj.fetch_by_user_id(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
const reservationControllerObj = new reservationController()
export default reservationControllerObj
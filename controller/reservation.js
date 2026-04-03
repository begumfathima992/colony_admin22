import reservationSchema, { reservation_byIdSchema } from "../helper/validator/reservation.js";
import reservationServicesObj from "../services/reservation.js";
import sequelize from "../config/dbconfig.js";
import ReservationModel from "../models/reservation.js";
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
async get_canceled_reservations(req, res) {
    try {
        // Use Number() to force these to be integers
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let offset = (page - 1) * limit;

        let str = `
            SELECT reservations.*, users.name, users.phone
            FROM reservations
            LEFT JOIN users ON CAST(reservations.user_id AS VARCHAR) = CAST(users.id AS VARCHAR)
            WHERE reservations."reservationCancel" = true
            ORDER BY reservations.id DESC
            LIMIT :limit OFFSET :offset;
        `;

        let canceledList = await sequelize.query(str, {
            replacements: { 
                limit: limit,   // Now a guaranteed number
                offset: offset  // Now a guaranteed number
            },
            type: sequelize.QueryTypes.SELECT
        });

        return res.status(200).json({ 
            statusCode: 200, 
            message: "Canceled reservations fetched successfully", 
            data: canceledList 
        });
    } catch (error) {
        console.error("Error fetching canceled reservations:", error);
        return res.status(500).json({ 
            message: error?.message, 
            statusCode: 500, 
            success: false 
        });
    }
}
}
const reservationControllerObj = new reservationController()
export default reservationControllerObj
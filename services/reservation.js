import sequelize from "../config/dbconfig.js";
import ReservationModel from "../models/reservation.js";

class reservationService {
    async get_all(req, res) {
        try {
            let { page = 1, limit = 10, name } = req.query
            let offset = (page - 1) * limit

            //             reservations.id,
            // reservations.user_id,
            // reservations.date,
            // reservations.time,
            // reservations.partySize,
            // reservations.tableNumber,
            // reservations.note,
            // reservations.paymentIntentId,
            // reservations.status,
            // reservations.cancellationPolicyAccepted,
            // reservations.reservationId,
            // reservations.extraOptions,
            // reservations.cancellationPolicy,
            // reservations.userDietaryByParty,
            // reservations.userDietary,
            // reservations.userOccasion,
            // reservations.userNotes,
            // reservations.stripeCustomerId,
            // reservations.stripePaymentMethodId,
            // reservations.customer_id,
            // reservations.clientSecret,
            //            reservations.ephemeralKey 
            let str = `
    SELECT reservations.*, users.name, users.phone
    FROM reservations
    LEFT JOIN users 
        ON reservations.user_id = users.id
    WHERE (:name IS NULL OR users.name LIKE :name)
    ORDER BY reservations.id DESC
    LIMIT :limit OFFSET :offset;
`;
            let get = await sequelize.query(str,
                {
                    replacements: {
                        name: name ? `%${name}%` : null,
                        limit, offset
                    }
                    , type: sequelize.QueryTypes.SELECT
                }
            )
            return res.status(200).json({ statusCode: 200, message: "fetch data", data: get })
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }



    async fetch_by_user_id(req, res) {
        try {
            let { user_id } = req.query
            let get = await ReservationModel?.findAll({ where: { user_id }, raw: true, order: [['id', 'DESC']] })
            return res.status(200).json({ message: "fetch data", data: get, statusCode: 200, success: true })
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }


    // Add this method to your reservationService class

}

const reservationServicesObj = new reservationService
export default reservationServicesObj
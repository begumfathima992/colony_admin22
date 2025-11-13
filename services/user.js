import sequelize from "../config/dbconfig"

class UserServices {
    async getUser(req, res) {
        try {

            let { page, limit } = req.query
            let str = ` SELECT * FROM users  
            LEFT JOIN  Reservation ON  users.id= Reservation.user_id
            `
            let get = sequelize.query(str)
            return res.status(200).json({ message: "Fetch data", data: get, statusCode: 200, success: true })
        } catch (error) {
            console.log(error,"gget error ")
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }

}
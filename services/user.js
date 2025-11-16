import sequelize from "../config/dbconfig.js"

class UserServices {
    async       getUser(req, res) {
        try {
            let { page = 1, limit = 10, name } = req.query
            page = parseInt(page)
            limit = parseInt(limit)
            let offset = (page - 1) * limit

            let str = ` SELECT users.id,
                              users.name,
                              users.phone,
                              users.anniversary_date,
                              users.birthday_date,
                              users.membership_number FROM users            
            `
            if (name) {
                str += `WHERE users.name ILIKE :name `;
            }
            str += ` ORDER BY id DESC
             LIMIT :limit OFFSET :offset`
            // console.log(str, "str111111111", req.query, 'req')

            let get = await sequelize.query(str, {
                replacements: {
                    name: name ? `%${name}%` : null,
                    limit, offset
                },
                type: sequelize.QueryTypes.SELECT
            })
            return res.status(200).json({ message: "Fetch data", data: get, statusCode: 200, success: true })
        } catch (error) {
            console.log(error, "gget error ")
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }

}
const userServicesObj = new UserServices()
export default userServicesObj
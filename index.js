import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/dbconfig.js'
import reservationModel from './models/reservation.js'
import UserModel from './models/user.js'
import UserRoutes from './routes.js/user.js'
import reservationRoutes from './routes.js/reservation.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors({
    origin: "*", // or set specific origin: ["http://localhost:3000"]
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/hello", (req, res) => {
    return res.json({ message: "Success", statusCode: 200 })
})

app.use("/user", UserRoutes)
app.use("/reservation", reservationRoutes)

const PORT = process.env.PORT || 2001;
// Start server after DB connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");

        await sequelize.sync({ alter: true }); // create/update tables if needed
        console.log("✅ Tables synced");

    } catch (err) {
        console.error("❌ Database error:", err);
    }
})();

app.listen(process.env.PORT || 2001, (err) => {
    if (err) {
        console.log(err, "error occcured")
        return
    }
    console.log(`Success full connection ${PORT}`)
})
async function s() {
    let t = await reservationModel.findAll({ raw: true })
    console.log(t, "tttttttttt")
}
// s()
import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/dbconfig.js'
import reservationModel from './models/reservation.js'
import UserModel from './models/user.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/", (req, res) => {
    res.json({ message: "Success", statusCode: 200 })
})
// app.use("/user")
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
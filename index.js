// import express from 'express'
// import dotenv from 'dotenv'
// import sequelize from './config/dbconfig.js'
// import reservationModel from './models/reservation.js'
// import UserModel from './models/user.js'
// import UserRoutes from './routes.js/user.js'
// import reservationRoutes from './routes.js/reservation.js'
// import cors from 'cors'
// import ContactRoutes from './routes.js/contact.js';
// import ContactModel from './models/contact.js';

// dotenv.config()
// const app = express()
// app.use(cors({
//     origin: "*", // or set specific origin: ["http://localhost:3000"]
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use("/hello", (req, res) => {
//     return res.json({ message: "Success", statusCode: 200 })
// })

// app.use("/user", UserRoutes)
// app.use("/reservation", reservationRoutes)
// app.use("/contact", ContactRoutes);

// const PORT = process.env.PORT || 2001;
// // Start server after DB connection
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("✅ Database connected successfully");

//         await sequelize.sync({ alter: true }); // create/update tables if needed
//         console.log("✅ Tables synced");

//     } catch (err) {
//         console.error("❌ Database error:", err);
//     }
// })();

// app.listen(process.env.PORT || 2001, (err) => {
//     if (err) {
//         console.log(err, "error occcured")
//         return
//     }
//     console.log(`Success full connection ${PORT}`)
// })
// async function s() {
//     let t = await reservationModel.findAll({ raw: true })
//     console.log(t, "tttttttttt")
// }
// // s()



import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/dbconfig.js'
import UserRoutes from './routes.js/user.js'
import reservationRoutes from './routes.js/reservation.js'
import ContactRoutes from './routes.js/contact.js'
import cors from 'cors'

dotenv.config()
const app = express()

// 1. IMPROVED CORS (Ensures browser compatibility with your AWS IP)
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ AWS HEALTH CHECK
app.get("/health", async (req, res) => {
    try {
        await sequelize.authenticate();
        return res.status(200).json({ 
            status: "UP", 
            database: "CONNECTED",
            timestamp: new Date() 
        });
    } catch (err) {
        return res.status(503).json({ 
            status: "DOWN", 
            error: err.message 
        });
    }
});

// 2. FIXED ROUTES (Matching the /admin prefix seen in your screenshot)
app.use("/admin/user", UserRoutes)
app.use("/admin/reservation", reservationRoutes) // Changed to match frontend request
app.use("/admin/contact", ContactRoutes);

// Optional: Keep the non-admin routes if other parts of the app use them
app.use("/user", UserRoutes)
app.use("/reservation", reservationRoutes)
app.use("/contact", ContactRoutes);

const PORT = process.env.PORT || 2001;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");

        // ⚠️ NOTE: sync({ alter: true }) is fine for now, 
        // but ensure your AWS Database user has "ALTER" permissions.
        await sequelize.sync({ alter: false }); 
        console.log("✅ Tables synced");

        app.listen(PORT, '0.0.0.0', () => { // Added '0.0.0.0' for better Docker binding
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1); 
    }
})();
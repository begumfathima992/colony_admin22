import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/", (req, res) => {
    res.json({ message: "Success", statusCode: 200 })
})
const PORT = process.env.PORT || 2001;

app.listen(process.env.PORT || 2001, (err) => {
    if (err) {
        console.log(err, "error occcured")
        return
    }
    console.log(`Success full connection ${PORT}`)
})
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db.js")

// routes importing
const authRoutes = require("./routes/authRoutes.js")
const testRoutes = require("./routes/testRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")

// creating app instance
const app = express()

// configuration of dotenv
dotenv.config()

// using cors
app.use(cors())
app.use(express.json());

// connecting database 
connectDb()

// routes 
app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req, res)=>{
    res.json({
        "message": "HEy connected successfully"
    })
})

module.exports = app;
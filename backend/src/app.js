const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db.js")


// routes importing
const authRoutes = require("./routes/authRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const profiles = require("./routes/profiles.js")
const companyRoutes = require("./routes/companyRoutes.js")
const studentRoutes = require("./routes/studentRoutes.js")
const jobRoutes = require("./routes/jobRoutes");

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
app.use("/api/admin", adminRoutes)
app.use("/api/profiles", profiles )
app.use("/api/company", companyRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res)=>{
    res.json({
        "message": "HEy connected successfully"
    })
})

module.exports = app;
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db.js")


// routes importing
const authRoutes = require("./routes/authRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const profiles = require("./routes/profiles.js")
const companyRoutes = require("./routes/companyRoutes.js")
const studentRoutes = require("./routes/studentRoutes.js")
const jobRoutes = require("./routes/jobRoutes")
const getCompanyDashboard = require("./routes/companyDashboardRoutes.js")
const getStudentDashboard = require("./routes/studentDashboardRoutes.js")



// creating app instance
const app = express()

// using cors — origin loaded from env (dotenv already configured at top)
app.use(cors({
  origin: process.env.FRONTEND_DEPLOYED_URL,
  credentials: true,
}));

app.use(express.json());

// connecting database 
connectDb()

// routes 
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
// app.use("/api/profiles", profiles )
app.use("/api/company", companyRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/jobs", jobRoutes);
app.use("/api/companyDashboard", getCompanyDashboard);
app.use("/api/studentDashboard", getStudentDashboard);



app.get("/", (req, res)=>{
    res.json({
        "message": "Hello from backend"
    })
})

module.exports = app;
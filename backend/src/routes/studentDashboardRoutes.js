const express = require("express")
const router = express.Router()

const {
    getStudentDashboard,
    applyJob , getAllJobs , getAllApplications
}= require("../controllers/studentDashboardController")

const {protect,authorizeRoles} = require("../middlewares/authMiddleware")

router.get("/dashboard", protect, authorizeRoles("student"), getStudentDashboard)

router.get("/jobs", protect, authorizeRoles("student"), getAllJobs)


router.post("/apply",protect,authorizeRoles("student"), applyJob)
router.get("/applications" , protect , authorizeRoles("student") , getAllApplications)


module.exports = router
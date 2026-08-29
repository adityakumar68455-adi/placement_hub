const express = require("express")
const router = express.Router()

const {
    getStudentDashboard,
    applyJob
}= require("../controllers/studentDashboardController")

const {protect,authorizeRoles} = require("../middlewares/authMiddleware")

router.get("/dashboard", protect, authorizeRoles("student"), getStudentDashboard)

router.post("/apply",protect,authorizeRoles("student"), applyJob)


module.exports = router
const express = require("express")
const router = express.Router()

const { getAdminDashboardAnalytics, verifyCompanyLifecycle } = require("../controllers/adminController.js")
const {protect, authorizeRoles} = require("../middlewares/authMiddleware.js")

router.get("/dashboard",protect, authorizeRoles("admin"), getAdminDashboardAnalytics)
router.put("/company/status/:id", protect, authorizeRoles("admin"), verifyCompanyLifecycle)

module.exports = router()
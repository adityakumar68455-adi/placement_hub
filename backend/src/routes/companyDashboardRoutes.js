const express = require("express");
const router = express.Router();

const {
    getCompanyDashboard,
    getCompanyJobs,
    getCompanyApplicants,
    updateApplicationStatus
} = require("../controllers/companyDashboardController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, authorizeRoles("company"), getCompanyDashboard);
router.get("/jobs", protect, authorizeRoles("company"), getCompanyJobs);
router.get("/applicants", protect, authorizeRoles("company"), getCompanyApplicants);
router.put("/application/:applicationId", protect, authorizeRoles("company"),updateApplicationStatus );

module.exports = router;






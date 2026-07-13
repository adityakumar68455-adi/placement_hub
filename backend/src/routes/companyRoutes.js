const express = require("express");
const router = express.Router();
const { createCompanyProfile } = require("../controllers/companyController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Only logged-in users with the "company" role can hit this endpoint
router.post("/profile", protect, authorizeRoles("company"), createCompanyProfile);

module.exports = router;

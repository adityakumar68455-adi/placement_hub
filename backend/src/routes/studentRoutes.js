const express = require("express");
const router = express.Router();
const { createStudentProfile } = require("../controllers/studentController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Only logged-in users with the "student" role can hit this endpoint
router.post("/profile", protect, authorizeRoles("student"), createStudentProfile);

module.exports = router;
const express = require("express");
const router = express.Router();
const { createStudentProfile ,readStudentProfile , updateStudentProfile } = require("../controllers/studentController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Only logged-in users with the "student" role can hit this endpoint
router.post("/profile", protect, authorizeRoles("student"), createStudentProfile);
router.get("/read", protect, authorizeRoles("student"), readStudentProfile);
router.put("/update" , protect , authorizeRoles("student"), updateStudentProfile);

module.exports = router;
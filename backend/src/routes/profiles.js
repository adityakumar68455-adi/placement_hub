const express = require("express");
const router = express.Router();

// Import your auth middlewares
const { protect, authorizeRoles } = require("../middlewares/authMiddleware.js");

// Import your profile controllers
const { 
    completeStudentProfile, 
    completeCompanyProfile 
} = require("../controllers/profileController");


// STUDENT PROFILE ROUTES
router.post(
    "/student/complete", 
    protect, 
    authorizeRoles("student"), 
    completeStudentProfile
);

//COMPANY PROFILE ROUTES
router.post(
    "/company/complete", 
    protect, 
    authorizeRoles("company"), 
    completeCompanyProfile
);

module.exports = router;
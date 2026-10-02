const express = require("express");
const router = express.Router();
const { createCompanyProfile, readCompanyProfile, updateCompanyProfile } = require("../controllers/companyController");
const { protect, authorizeRoles , checkVerifiedCompany } = require("../middlewares/authMiddleware");


// Only logged-in users with the "company" role can hit this endpoint
router.post("/createProfile", protect, authorizeRoles("company"), createCompanyProfile);
router.get("/Profile",protect,authorizeRoles("company"),readCompanyProfile);
router.put("/updateProfile",protect,authorizeRoles("company") ,updateCompanyProfile);



module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createJob,
  getCompanyJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const {
  protect,
  authorizeRoles,
  checkVerifiedCompany
} = require("../middlewares/authMiddleware");

// ================= CREATE JOB =================
router.post(
  "/create",
  protect,
  authorizeRoles("company"),
  checkVerifiedCompany, //  ADMIN APPROVAL CHECK
  createJob
);

// ================= GET COMPANY JOBS =================
router.get(
  "/my-jobs",
  protect,
  authorizeRoles("company"),
  checkVerifiedCompany,
  getCompanyJobs
);

// ================= UPDATE JOB =================
router.put(
  "/update/:id",
  protect,
  authorizeRoles("company"),
  checkVerifiedCompany,
  updateJob
);

// ================= DELETE JOB =================
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("company"),
  checkVerifiedCompany,
  deleteJob
);

module.exports = router;
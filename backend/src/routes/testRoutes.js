const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// 🔐 Only logged-in users
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Profile accessed",
    user: req.user,
  });
});

// 🔐 Only admin
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

// 🔐 Only company
router.get("/company", protect, authorizeRoles("company"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Company",
  });
});

module.exports = router;
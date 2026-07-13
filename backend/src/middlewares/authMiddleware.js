const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Company = require("../models/CompanySchema"); //  Import Company model here

// ================= PROTECT (VERIFY TOKEN) =================
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

// ================= AUTHORIZE ROLES =================
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${req.user.role}`,
      });
    }
    next();
  };
};

// =================  NEW: CHECK VERIFIED COMPANY =================
exports.checkVerifiedCompany = async (req, res, next) => {
  try {
    // 1. Find the company profile belonging to this authenticated user
    const company = await Company.findOne({ user: req.user._id });

    // 2. Gatekeeper Check: Has the user even filled out their profile wizard yet?
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Profile missing. Please complete your company onboarding details first.",
      });
    }

    // 3. Gatekeeper Check: Is the application profile still pending?
    if (company.verificationStatus === "pending") {
      return res.status(403).json({
        success: false,
        isPending: true,
        message: "Access Denied. Your profile is currently awaiting administrator approval.",
      });
    }

    // 4. Gatekeeper Check: Was the application explicitly rejected by admin?
    if (company.verificationStatus === "rejected") {
      return res.status(403).json({
        success: false,
        isRejected: true,
        message: `Access Denied. Your registration was rejected. Reason: ${company.actionReason || "None specified"}`,
      });
    }

    // 5. Success: The company is verified. Attach profile to request and pass through
    req.companyProfile = company; 
    next();

  } catch (error) {
    console.error("Company Gatekeeper Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal security gateway failure verification checking.",
    });
  }
};
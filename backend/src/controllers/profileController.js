const Student = require("../models/StudentSchema");
const Company = require("../models/CompanySchema");

// POST: Complete Student Profile Setup
exports.completeStudentProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From your auth token middleware
        const { fullName, phone, alternativePhone, cgpa, branch, skills, experience, resumeUrl } = req.body;

        // Validation for required schema fields
        if (!fullName || !phone || cgpa === undefined || !branch) {
            return res.status(400).json({ success: false, message: "Missing compulsory student fields." });
        }

        // Prevent duplicate creation profiles
        const existingProfile = await Student.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Student profile already exists." });
        }

        const newStudentProfile = await Student.create({
            user: userId,
            fullName,
            phone,
            alternativePhone,
            cgpa,
            branch,
            skills: skills || [],
            experience: experience || [],
            resumeUrl: resumeUrl || ""
        });

        res.status(201).json({
            success: true,
            message: "Student profile configured successfully.",
            data: newStudentProfile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST: Complete Company Profile Setup 
exports.completeCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { companyName, website, industry, description, location, contactEmail } = req.body;

        // Validation for required schema fields
        if (!companyName || !industry || !location || !contactEmail) {
            return res.status(400).json({ success: false, message: "Missing compulsory company fields." });
        }

        const existingProfile = await Company.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Company profile already setup." });
        }

        const newCompanyProfile = await Company.create({
            user: userId,
            companyName,
            website,
            industry,
            description,
            location,
            contactEmail,
            verificationStatus: "pending" // Explicitly explicitly set as pending upon arrival
        });

        res.status(201).json({
            success: true,
            message: "Company profile details submitted successfully for review.",
            data: newCompanyProfile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
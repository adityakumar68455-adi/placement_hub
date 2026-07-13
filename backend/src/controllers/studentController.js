const Student = require("../models/StudentSchema");

exports.createStudentProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Check if profile exists
        const existingProfile = await Student.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ 
                success: false, 
                message: "Student profile already exists." 
            });
        }

        // 2. Extract data from the frontend form
        const { fullName, phone, alternativePhone, cgpa, branch, activeBacklogs, skills, experience, resumeUrl } = req.body;

        // 3. Validate mandatory fields
        if (!fullName || !phone || !cgpa || !branch) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide your full name, phone, CGPA, and branch." 
            });
        }

        // 4. Create the student profile
        const newStudent = await Student.create({
            user: userId,
            fullName,
            phone,
            cgpa,
            branch
        });

        res.status(201).json({
            success: true,
            message: "Student profile created successfully.",
            data: newStudent
        });

    } catch (error) {
        console.error("Error creating student profile:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
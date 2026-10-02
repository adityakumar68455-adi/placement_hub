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
        if (!fullName || !phone || cgpa === undefined || !branch) {
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

exports.readStudentProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const readProfile = await Student.findOne({ user: userId }).populate();
        
        if (!readProfile) {
            return res.status(404).json({
                success: false, // Fixed spelling of "success" as well
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true, 
            data: readProfile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateStudentProfile = async (req , res) =>{
    try {
        const userId = req.user.id;
        const student = await Student.findOne({user: userId});

        if (!student){
            return res.status(404).json({
                success : false ,
                message :' Student not found' 
            })
        }

        const {fullName ,phone, branch , experience , skills} = req.body;

        if(fullName) student.fullName = fullName;
        if(phone) student.phone = phone
        if(branch) student.branch = branch;
        if(experience) student.experience = experience;
        if(skills) student.skills = skills;


        const updateStudent = await student.save();

        res.status(200).json({
            success : true , 
            message : "Updated successfully", 
            data : updateStudent
        });

    } catch (error) {
        console.error("Error updating student profile:", error.message)
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
};

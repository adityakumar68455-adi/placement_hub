const student = require("../models/StudentSchema.js")
const application = require("../models/ApplicationSchema.js")
const jobs = require("../models/JobSchema.js")

exports.getStudentDashboard = async (req,res) => {
    try {
        const userId = req.user.id

        const findStudent = await student.findOne({user : userId}) 
        if(!findStudent){
            return res.status(404).json({
                success: false,
                status: 404,
                message: "student profile Not Found"
            })
        }

        // Use findStudent._id (Student profile ID) — NOT userId (User ID)
        // Applications reference the Student document _id, not User _id
        const studentId = findStudent._id;

        const totalApplications = await application.countDocuments({
            student: studentId 
        })
        const interviews = await application.countDocuments({
            student: studentId,
            status: "interviews"
         })

         const selected = await application.countDocuments({
            student: studentId,
            status:"selected"
        })

         const rejected = await application.countDocuments({    
            student: studentId,
            status:"rejected"
         })
       
    
        res.json({
            totalApplications,
            interviews,
            selected,
            rejected
            
        })
    } catch (error) {
        res.status(400).json({
            message: "not found"
        })
    }
}
exports.getAllJobs= async (req , res) =>{
    try {
        const job = await jobs.find({});
        res.status(200).json({
            success: true ,
            data : job
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message : error.message
        })
    }
}
// ------------Apply job controller----------------

exports.applyJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { jobId } = req.body;

        // 1. CRITICAL FIX: Find the student document linked to the logged-in user
        const currentStudent = await student.findOne({ user: userId });
        if (!currentStudent) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found for this user account."
            });
        }

        // 2. Check duplicate applications using the actual Student ID
        const alreadyApplied = await application.findOne({
            student: currentStudent._id,
            job: jobId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You already applied for this job"
            });
        }

        // 3. Create the application using the actual Student ID
        const newApplication = await application.create({
            student: currentStudent._id,
            job: jobId
        });

        res.status(201).json({
            success: true,
            message: "applied successfully",
            data: newApplication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find the student profile first
        const currentStudent = await student.findOne({ user: userId });
        if (!currentStudent) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });
        }

        // 2. Fetch records using the Student profile ID
        const applications = await application.find({ student: currentStudent._id })
            .populate({
                path: "student",
                select: "fullName phone branch cgpa"
            })
            .populate({
                path: "job",
                select: "title status"
            });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

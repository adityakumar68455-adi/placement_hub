// I am importing all of our models 
const User = require("../models/UserSchema");
const Company = require("../models/CompanySchema");
const Student = require("../models/StudentSchema");
const Job = require("../models/JobSchema");
const Application = require("../models/ApplicationSchema");
const AuditLog = require("../models/AuditLogSchema");

exports.getAdminDashboardAnalytics = async (req, res) => {
    try {
        // Pipeline 1: Execution of parallel quick base counts
        const [
            totalUsersCount,
            companyStats,
            placementStats,
            recentLogs
        ] = await Promise.all([
            User.countDocuments(),
            
            // Aggregation for split breakdowns of verification categories
            Company.aggregate([
                {
                    $group: {
                        _id: "$verificationStatus",
                        count: { $sum: 1 }
                    }
                }
            ]),

            // Aggregation for job applications status overview
            Application.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]),

            // Pull last 5 important occurrences inside our audit data
            AuditLog.find()
                .populate("performedBy", "email")
                .sort({ createdAt: -1 })
                .limit(5)
        ]);

        // Pipeline 2: Calculating average package (CTC) and active openings
        const jobMetrics = await Job.aggregate([
            {
                $group: {
                    _id: "$status",
                    totalCount: { $sum: 1 },
                    averageCTC: { $avg: "$ctc" }
                }
            }
        ]);

        // Format clean key-value maps to keep data consumption on frontend light
        const companyBreakdown = { pending: 0, verified: 0, rejected: 0 };
        companyStats.forEach(item => {
            if (item._id) companyBreakdown[item._id] = item.count;
        });

        const applicationBreakdown = { applied: 0, shortlisted: 0, interviewing: 0, selected: 0, rejected: 0 };
        placementStats.forEach(item => {
            if (item._id) applicationBreakdown[item._id] = item.count;
        });

        // Compute total counts across active and historical placement profiles
        const totalStudentsCount = await Student.countDocuments();
        const placedStudentsCount = await Student.countDocuments({ isPlaced: true });
        
        const placementPercentage = totalStudentsCount > 0 
            ? ((placedStudentsCount / totalStudentsCount) * 100).toFixed(2) 
            : 0;

        // Structured single API payload response
        res.status(200).json({
            success: true,
            data: {
                systemOverview: {
                    totalRegisteredUsers: totalUsersCount,
                    totalRegisteredStudents: totalStudentsCount,
                    placedStudents: placedStudentsCount,
                    placementRate: `${placementPercentage}%`
                },
                companyMetrics: {
                    totalCompanies: Object.values(companyBreakdown).reduce((a, b) => a + b, 0),
                    breakdown: companyBreakdown
                },
                jobMarketMetrics: {
                    jobsOverview: jobMetrics,
                    applicationFunnel: applicationBreakdown
                },
                recentActivityTrails: recentLogs
            }
        });

    } catch (error) {
        console.error("Advanced Admin Metrics Pipeline Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Analytical calculation operations encountered an internal failure.",
            error: error.message
        });
    }
};

exports.verifyCompanyLifecycle = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body; // status can be "verified" or "rejected"

        if (!["verified", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid modification status requested." });
        }

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Target company instance not found." });
        }

        company.verificationStatus = status;
        company.verifiedBy = req.user.id;
        company.actionReason = reason || "";
        await company.save();

        // Create an audit trace log Entry
        await AuditLog.create({
            performedBy: req.user.id,
            action: status === "verified" ? "COMPANY_VERIFIED" : "COMPANY_REJECTED",
            targetId: company._id,
            details: `Company profile "${company.companyName}" modification changed to: ${status}. Reason context: ${reason || 'None'}`
        });

        res.status(200).json({
            success: true,
            message: `Company entity profile has updated to status state: ${status}`,
            data: company
        });
    } catch (error) {
        console.error("Company Action Failure:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        // .populate() grabs the email from the linked User account so the admin can see it
        const companies = await Company.find().populate("user", "email role");
        
        res.status(200).json({
            success: true,
            count: companies.length,
            data: companies
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("user", "email");
        
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.toggleStudentEligibility = async (req, res) => {
    try {
        // Find the student by the ID passed in the URL
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Toggle the true/false status
        student.eligibilityStatus = !student.eligibilityStatus;
        await student.save();

        res.status(200).json({
            success: true,
            message: `Student eligibility updated to: ${student.eligibilityStatus}`,
            data: student
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        // Populate the company name so the admin knows who posted it
        const jobs = await Job.find().populate("company", "companyName contactEmail");
        
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.closeJobByAdmin = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        job.status = "closed";
        await job.save();

        res.status(200).json({
            success: true,
            message: "Job successfully taken down by admin",
            data: job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        // Populate the student details and the job details (including the company name)
        const applications = await Application.find()
            .populate("student", "fullName phone branch cgpa")
            .populate({
                path: "job",
                select: "title status",
                populate: { path: "company", select: "companyName" }
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

exports.getPlacedStudents = async (req, res) => {
    try {
        // Find only students where isPlaced is strictly true
        const placedStudents = await Student.find({ isPlaced: true })
            .populate("user", "email");

        res.status(200).json({
            success: true,
            count: placedStudents.length,
            data: placedStudents
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


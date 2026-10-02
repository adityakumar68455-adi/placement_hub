const Company = require("../models/CompanySchema");
const Job = require("../models/JobSchema");
const Application = require("../models/ApplicationSchema");


//  COMPANY DASHBOARD (MAIN)

exports.getCompanyDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get company
        const company = await Company.findOne({ user: userId });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // 2. Get company jobs
        const jobs = await Job.find({ company: company._id });

        const jobIds = jobs.map(job => job._id);

        // 3. Dashboard counts
        const totalJobs = jobs.length;

        const totalApplications = await Application.countDocuments({
            job: { $in: jobIds }
        });

        const shortlisted = await Application.countDocuments({
            job: { $in: jobIds },
            status: "shortlisted"
        });

        const interviewing = await Application.countDocuments({
            job: { $in: jobIds },
            status: "interviews"
        });

        const selected = await Application.countDocuments({
            job: { $in: jobIds },
            status: "selected"
        });

        const rejected = await Application.countDocuments({
            job: { $in: jobIds },
            status: "rejected"
        });

        res.status(200).json({
            success: true,
            data: {
                totalJobs,
                totalApplications,
                shortlisted,
                interviewing,
                selected,
                rejected
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ======================================
//  GET COMPANY JOBS
// ======================================
exports.getCompanyJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const company = await Company.findOne({ user: userId });

        const jobs = await Job.find({ company: company._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ======================================
//  GET ALL APPLICANTS
// ======================================
exports.getCompanyApplicants = async (req, res) => {
    try {
        const userId = req.user.id;

        const company = await Company.findOne({ user: userId });

        const jobs = await Job.find({ company: company._id });

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds }
        })
        .populate("student", "fullName phone cgpa resumeUrl")
        .populate("job", "title")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: applications
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ======================================
// UPDATE APPLICATION STATUS
// ======================================
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const validStatus = [
            "applied",
            "shortlisted",
            "interviews",
            "selected",
            "rejected"
        ];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // Update status
        application.status = status;

        // Push into timeline
        application.timeline.push({
            status: status,
            updatedAt: new Date()
        });

        await application.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: application
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const Job = require("../models/JobSchema");

// ================= CREATE JOB =================
exports.createJob = async (req, res) => {
  try {
    const companyId = req.companyProfile._id; 

    const { title, description, location, ctc } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      ctc,
      company: companyId
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET COMPANY JOBS =================
exports.getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.companyProfile._id;

    const jobs = await Job.find({ company: companyId });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE JOB =================
exports.updateJob = async (req, res) => {
  try {
    const companyId = req.companyProfile._id;

    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // 🔥 SECURITY CHECK
    if (job.company.toString() !== companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this job"
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Job updated",
      data: job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE JOB =================
exports.deleteJob = async (req, res) => {
  try {
    const companyId = req.companyProfile._id;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // 🔥 SECURITY CHECK
    if (job.company.toString() !== companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job"
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
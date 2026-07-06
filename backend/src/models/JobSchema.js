const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true },
    ctc: { type: Number, required: true }, // Compensation package numerical value for analytics
    minCgpaCriteria: { type: Number, default: 0 },
    maxBacklogsAllowed: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "closed", "draft"], default: "active" },
    deadline: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
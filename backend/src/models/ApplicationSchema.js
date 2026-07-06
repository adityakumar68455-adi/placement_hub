const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    status: {
        type: String,
        enum: ["applied", "shortlisted", "interviewing", "selected", "rejected"],
        default: "applied"
    },
    feedback: { type: String, default: "" }, // Intermediary feedback from company recruiters
    timeline: [
        {
            status: { type: String },
            updatedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

// Avoid duplicate submissions: A student can apply to a job exactly once
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    alternativePhone: { type: String },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    activeBacklogs: { type: Number, default: 0, min: 0 },
    branch: { type: String, required: true }, // e.g., CSE, ECE, ME
    skills: [{ type: String, trim: true }],
    experience: [{
        title: { type: String },
        company: { type: String },
        duration: { type: String },
        description: { type: String }
    }],
    resumeUrl: { type: String, default: "" },
    isPlaced: { type: Boolean, default: false },
    eligibilityStatus: { type: Boolean, default: true } // Admin can ban non-compliant students
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
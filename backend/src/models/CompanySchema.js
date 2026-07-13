const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    companyName: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    industry: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    contactEmail: { type: String, required: true, toLowerCase: true },
    verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },
 
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // References the admin user who verified them
    },
    actionReason: { type: String, default: "" } // Why it was rejected or suspended
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
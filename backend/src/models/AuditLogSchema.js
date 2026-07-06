const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    action: { type: String, required: true }, // e.g., "COMPANY_VERIFIED", "JOB_CLOSED", "STUDENT_BANNED"
    targetId: { type: mongoose.Schema.Types.ObjectId }, // ID of the entity altered
    details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
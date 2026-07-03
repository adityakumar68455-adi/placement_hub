const bcrypt = require("bcryptjs")
const User = require("../models/UserSchema.js")

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });
        
        if (adminExists) {
            return;
        }

        // Use environment variables or reliable defaults
        const adminEmail = process.env.ADMIN_EMAIL || "admin@portal.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";

        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};

module.exports = seedAdmin;
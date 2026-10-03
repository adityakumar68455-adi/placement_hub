const mongoose = require("mongoose");
const seedAdmin = require("./adminSeeder.js")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("You are connected to the database");

        // create admin if there is not any
        await seedAdmin();
    } catch (error) {
        console.log("DB Error:", error.message);
        // Do not use process.exit(1) in serverless environments like Vercel
        // as it crashes the entire function and causes a 500 error.
    }
};

module.exports = connectDB;
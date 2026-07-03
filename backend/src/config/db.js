const mongoose = require("mongoose");
const seedAdmin = require("./adminSeeder.js")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("You are connected to the database");

        // create admin if there is not any
        seedAdmin();
    } catch (error) {
        console.log("DB Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;



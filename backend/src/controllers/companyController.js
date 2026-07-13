const Company = require("../models/CompanySchema");

exports.createCompanyProfile = async (req, res) => {
    try {
        // req.user comes from your protect middleware!
        const userId = req.user.id; 

        // 1. Check if a profile already exists so they don't create two
        const existingProfile = await Company.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ 
                success: false, 
                message: "Company profile already exists for this user." 
            });
        }

        // 2. Extract the data the company sent from the frontend form
        const { companyName, website, industry, description, location, contactEmail } = req.body;

        // 3. Validate mandatory fields based on your schema
        if (!companyName || !industry || !location || !contactEmail) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill out all required company details." 
            });
        }

        // 4. Create the profile (verificationStatus will default to "pending" per your schema)
        const newCompany = await Company.create({
            user: userId,
            companyName,
            website,
            industry,
            description,
            location,
            contactEmail
        });

        res.status(201).json({
            success: true,
            message: "Company profile created successfully. Awaiting admin approval.",
            data: newCompany
        });

    } catch (error) {
        console.error("Error creating company profile:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
const Company = require("../models/CompanySchema");
const Student = require("../models/StudentSchema");



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


exports.readCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Fixed findOne (capital O) 
        // 2. Fixed spelling of companyName (assuming that matches your schema)
        const readProfile = await Company.findOne({ user: userId }).populate();
        
        if (!readProfile) {
            return res.status(404).json({
                success: false, // Fixed spelling of "success" as well
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true, 
            data: readProfile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.updateCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find existing company profile
        const company = await Company.findOne({ user: userId });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found."
            });
        }

        // (Optional) 2. Restrict update if not approved
        // if (company.verificationStatus !== "approved") {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Profile not approved by admin yet."
        //     });
        // }

        // 3. Get updated fields from body
        const { companyName, website, industry, description, location, contactEmail } = req.body;

        // 4. Update only provided fields
        if (companyName) company.companyName = companyName;
        if (website) company.website = website;
        if (industry) company.industry = industry;
        if (description) company.description = description;
        if (location) company.location = location;
        if (contactEmail) company.contactEmail = contactEmail;


        // 5. Save updated profile
        const updatedCompany = await company.save();

        res.status(200).json({
            success: true,
            message: "Company profile updated successfully.",
            data: updatedCompany
        });

    } catch (error) {
        console.error("Error updating company profile:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



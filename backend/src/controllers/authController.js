const User = require("../models/UserSchema.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.register = async (req, res) => {
    try {
        let {email, password, role} = req.body;

        if (!email || !password || !role){
            return res.status(400).json({message: "All details must be present", success:false})
        }

        let allowedRoles = ["student", "company"]

        if (role === "admin"){
            return res.status(403).json({
            success: false,
            message: "Admin cannot be registered publicly"
        });
        }

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        email = email.trim().toLowerCase();

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
            });
        }
        

        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message: "User is already present in the database", success:false})
        }

        if (password.length < 8){ 
            return res.status(400).json({success:false ,message: "Min password length should be 8"})
        }

        // hashed the password
        const hashedPassword = await bcrypt.hash(password, 12)

        // user created in the databse 
        const user = await User.create({
            email,
            password: hashedPassword,
            role,
        })

        const userResponse = { _id: user._id, email: user.email, role: user.role, };

        res.status(201)
            .json({
                success: true,
                message: "User created successfully",
                userResponse: userResponse
            })
    
    } catch (error) {
        console.log("Register error", error.message)
        res.status(500).json({message: error.message})
    }
}

exports.login = async (req,res)=> {
    try {
        let {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({message: "Both details mandatory"})
        }

        email = email.trim().toLowerCase();
        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generating jwt token
        const token = jwt.sign(
            {id: user._id , role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        const userResponse = { _id: user._id, email: user.email, role: user.role, };

        res.status(200).json({
            message: "Login successful",
            token,
            user: userResponse
        });
        
    } catch (error) {
        console.error("error while login", error.message)
        res.status(500).json({message: error.message})
    }
}
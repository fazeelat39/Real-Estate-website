const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function SignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Check for existing user
        const user = await userModel.findOne({ email });

        console.log("user", user);

        if (user) {
            throw new Error("User already exists.");
        }

        // Validate input fields
        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        // Hash password
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword =await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password.");
        }

        // Create user object
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        // Save user to database
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = SignUpController;

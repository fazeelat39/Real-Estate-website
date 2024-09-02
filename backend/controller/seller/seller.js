
const seller = require("../../models/seller");
const bcrypt = require('bcryptjs');

console.log("Seller Model:", seller);

async function sellerController(req, res) {
    try {
        const { email, password, name , phoneNumber , address , zipCode} = req.body;

        // Check for existing user
        const user = await seller.findOne({ email });

        console.log("seller", seller);

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

        if (!phoneNumber) {
            throw new Error("Please provide a phoneNumber.");

        }if (!address) {
            throw new Error("Please provide a address.");

        }if (!zipCode) {
            throw new Error("Please provide a zipCode.");
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log("Hashed Password:", hashPassword);
                if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password.");
        }

        // Create user object
        const payload = {
            ...req.body,
            role: "SELLER",
            password: hashPassword
        };

        // Save user to database
        const userData = new seller(payload);
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

module.exports = sellerController;

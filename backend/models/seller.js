const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt
const Jwt = require('jsonwebtoken'); // Import jsonwebtoken

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
      type: String,
      required: [true, "please enter your business email"],
      unique: true
  }
,  
    realEstate: {
        type: String,
        required: [true, "please enter your business name"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false
    },
    profilePic: {
        type: String,
    },
    description: {
        type: String
    },
    role: {
        type: String,
        default: "SELLER"
    },
    zipCode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: [true, "please provide your business phone number"]
    },
    address: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
}, {
    timestamps: true
});

// Pre-save hook to hash password
sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT token generation method
sellerSchema.methods.getJwtToken = function() {
    return Jwt.sign({ id: this._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES
    });
};

// Password comparison method
sellerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const seller = mongoose.model("Seller", sellerSchema);

module.exports = seller;

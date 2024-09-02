const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const seller = require("../../models/seller.js");
const ErrorHandler = require("../../utils/ErrorHandler.js");
const sendsellerToken = require("../../utils/sellerToken.js");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors.js");



async function sellerloginController(req, res, next) {
  catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await seller.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) { return next(
            new ErrorHandler("Please provide the correct password", 400)
          );
        }
  
        sendsellerToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  
}
module.exports = sellerloginController

const seller = require("../../models/seller.js");
const ErrorHandler = require("../../utils/ErrorHandler.js");
const isSeller = require ("../../middleware/auth.js");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors.js");
async function getsellerController(req, res, next) {



  isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const sellerData = await seller.findById(req.seller._id);
  
        if (!sellerData) {
          return next(new ErrorHandler("User doesn't exist", 400));
        }
  
        res.status(200).json({
            success: true,
            seller: sellerData,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      })
    }
  module.exports = getsellerController
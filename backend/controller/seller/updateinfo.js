router.put(
    "/update-seller-info",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { name, description, address, phoneNumber, zipCode } = req.body;
  
        const seller = await seller.findById(req.seller._id);
  
        if (!seller) {
          return next(new ErrorHandler("User not found", 400));
        }

        seller.name = name;
        seller.description = description;
        seller.address = address;
        seller.phoneNumber = phoneNumber;
        seller.zipCode = zipCode;
  
        await seller.save();
  
        res.status(201).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
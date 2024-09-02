router.put(
    "/update-payment-methods",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { withdrawMethod } = req.body;
  
        const seller = await seller.findByIdAndUpdate(req.seller._id, {
          withdrawMethod,
        });
  
        res.status(201).json({
          success: true,
          seller,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
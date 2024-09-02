router.get(
    "/get-seller-info/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const seller = await seller.findById(req.params.id);
        res.status(201).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
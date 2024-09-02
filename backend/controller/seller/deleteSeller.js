router.delete(
    "/delete-seller/:id",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const seller = await seller.findById(req.params.id);
  
        if (!seller) {return next(
            new ErrorHandler("Seller is not available with this id", 400)
          );
        }
  
        await seller.findByIdAndDelete(req.params.id);
  
        res.status(201).json({
          success: true,
          message: "Seller deleted successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
router.get(
    "/admin-all-sellers",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const sellers = await seller.find().sort({
          createdAt: -1,
        });
        res.status(201).json({
          success: true,
          sellers,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
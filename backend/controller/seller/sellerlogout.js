router.get(
    "/logout",
    catchAsyncErrors(async (req, res, next) => {
      try {
        res.cookie("seller_token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(201).json({
          success: true,
          message: "Log out successful!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
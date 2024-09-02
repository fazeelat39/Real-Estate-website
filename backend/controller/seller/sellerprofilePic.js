router.put(
    "/update-seller-profilePic",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        let existsSeller = await seller.findById(req.seller._id);
  
          const imageId = existsSeller.profilePic.public_id;
  
          await cloudinary.v2.uploader.destroy(imageId);
  
          const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, {
            folder: "profilePic",
            width: 150,
          });

          existsSeller.profilePic = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
  
    
        await existsSeller.save();
  
        res.status(200).json({
          success: true,
          seller:existsSeller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
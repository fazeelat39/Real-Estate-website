// Activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { activation_token } = req.body;

            const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

            if (!newSeller) {
                return next(new ErrorHandler("Invalid token", 400));
            }

            const { name, email, password, profilePic, zipCode, address, phoneNumber } = newSeller;

            let sellerExists = await seller.findOne({ email });

            if (sellerExists) {
                return next(new ErrorHandler("User already exist", 400));
            }

            const createdSeller = await seller.create({
                name,
                email,
                profilePic,
                password,
                zipCode,
                address,
                phoneNumber,
            });

            sendsellerToken(createdSeller, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

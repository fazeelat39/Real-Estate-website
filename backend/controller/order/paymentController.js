async function paymentController(req,res){
    try{
         const {cartItems} = request.body

         console.log("cartItems",cartItems)

         const user = await userModel.findOne({_id : request.userId})


    customer_email : user.email     
    line_items : cartItems.map((item,index)=>
     {
        return{
            price_data : {
                currency : 'pkr',
                product_data : {
                    name : item.productId.productName,
                    images : item.productId.productImage,
                    metadata: {
                        productId : item.productId._id
                    }                
                },
                unit_amount : item.productId.sellingPrice
            },

            adjustable_quantity : {
                enabled : true,
                minimum : 1
            },
            quantity : item. quantity
        }
    })



    }catch(err){
        
        res.status(400).json({
            message : err.message || err ,
            error : true,
            success : false
        })
}
}

module.exports = paymentController
const OrderModel = require("../models/order.model")

const createOrder = async(req,res)=>{
    try{
        console.log(req)
        order = new OrderModel({
            userId : req.body.userId,
            extraCharge : req.body.extraCharge,
            orderAmount : req.body.orderAmount,
            orderStatus: req.body.orderStatus,
        })
        await order.save()
        // add item in orderItems table

        let cartItems = req.body.cartItems 

        return res.status(200).json({msg:"Order Save",order:order})
    }
    catch(err){
        return res.status(400).json({error:err.error, msg:"something wrong"})
    }
}   

module.exports = {createOrder,}


const OrderModel = require("../models/order.model")

const createOrder = async(req,res)=>{
    try{
        console.log(req.body)
        order = new OrderModel({
            userId : req.body.userId,
            extraCharge : req.body.extraCharges,
            orderAmount : req.body.netTotal,
        })
        await order.save()
        // add item in orderItems table

        let cartItems = req.body.cartItems 

        return res.status(200).json({msg:"Order Save",order:order})
    }
    catch(err){
        console.log("err: ",err)
        return res.status(400).json({error:err.error, msg:"something wrong"})
    }
}   

module.exports = {createOrder,}


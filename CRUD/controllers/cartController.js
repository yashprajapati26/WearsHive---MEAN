const CartModel = require("../models/cart.model");
const mongoType = require('mongoose').Types;


const addToCart = async (req, res) => {
    try {
        console.log(req.body)
        let cart = new CartModel(req.body)
        await cart.save()
        let cartItem = await CartModel.find({
            userId: req.body.userId
        })
        res.status(200).json({
            msg: "Product Added to Cart",
            totalData: cartItem.length
        })
    } catch (err) {
        res.status(500).json({
            msg: "something wrong " + err.message
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        userId = req.body.userId;
        productId = req.body.productId;
        if (mongoType.ObjectId.isValid(userId) && mongoType.ObjectId.isValid(productId)) {
            await CartModel.deleteOne({
                userId: userId,
                productId: productId
            })
            let cartItem = await CartModel.find({
                userId: req.body.userId
            })
            res.status(200).json({
                msg: "Removed From Cart",
                totalData: cartItem.length
            })
        } else {
            res.status(200).json({
                msg: "Id not valid"
            })
        }

    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

const getCartItems = async (req, res) => {
    try {
        let userId = req.params.id;
        if (mongoType.ObjectId.isValid(userId)) {
            let cartItem = await CartModel.find({
                userId: userId
            }).populate('productId')

            let TotalAmount=0
            for(let i=0; i<cartItem.length; i++){
                console.log(cartItem[i].productId.price)
                TotalAmount += parseInt(cartItem[i].productId.price)
            } 
            console.log(TotalAmount)

            res.status(200).json({
                cartItem: cartItem,
                totalItem: cartItem.length,
                TotalAmount : TotalAmount,
                msg: "success"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: err.message
        })
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    getCartItems,
}
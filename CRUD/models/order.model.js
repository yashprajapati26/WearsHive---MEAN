const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    extraCharge:{
        type:String,
    },
    orderAmount:{
        type:String,
    },
    orderStatus:{
        type:String,
        default:"Pending"
    },
    orderAt:{
        type: Date,
        default: Date.now
    },
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
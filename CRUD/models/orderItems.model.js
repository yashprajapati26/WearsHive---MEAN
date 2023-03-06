const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required: true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required: true
    },
    qty:{
        type:String,
        default: '1',
        required:true
    },
    totalAmount:{
        type:String,
    },
    
})

const OrderItems = mongoose.model('OrderItems', OrderItemsSchema);

module.exports = OrderItems;
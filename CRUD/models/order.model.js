const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    

})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
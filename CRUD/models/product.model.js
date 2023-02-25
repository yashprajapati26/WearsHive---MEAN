const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        title: {type:String, require:true},
        price:{type:String, require:true},
        qty:{type:String},
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true
        },
        image: {
            data: Buffer,
            path: String,
            contentType: String
        },
        detailUrl: {type:String, require:true},
    });
    
const Product = mongoose.model('Product', ProductSchema);
    
module.exports = Product;
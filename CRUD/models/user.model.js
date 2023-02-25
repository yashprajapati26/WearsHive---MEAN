
const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name:{type:String},
    email:{type:String,unique: true},
    mobile:{type:String},
    password:{type:String},
    token:{type:String},
    usertype:{type:String},
});

module.exports = User;
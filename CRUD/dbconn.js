
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
// const DBUri = "mongodb+srv://yashprajapati:YPradixweb8@cluster0.yvv9tj6.mongodb.net/nodeEjs?retryWrites=true&w=majority";
const DBUri = "mongodb+srv://yashmongodb:Yash%40260801@cluster0.w8ehrtf.mongodb.net/BlogApp?retryWrites=true&w=majority"


mongoose.connect(DBUri,{ useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err){
        console.error(err);
    }
    else console.log("database connected sucessfully")
})

module.exports = mongoose
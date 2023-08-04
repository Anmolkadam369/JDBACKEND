const mongoose = require("mongoose");
const logOutSchema = new mongoose.Schema({
   
    timeOut:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("logOut",logOutSchema);

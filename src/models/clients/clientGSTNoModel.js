const mongoose = require('mongoose')

const clientGSTNo = new mongoose.Schema({
    GSTNo:{
        type:String,
        required:true,
        trim:true
    }

},{timestamps:true});
module.exports = mongoose.model("gstNo", clientGSTNo)
const mongoose = require('mongoose')

const clientPasswordChange = new mongoose.Schema({
    currentPassword:{
        type:String,
        required:true,
        trim:true
    },
    newPassword:{
        type:String,
        required:true,
        trim:true
    },
    confirmPassword:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    }

},{timestamps:true});
module.exports = mongoose.model("changePassword", clientPasswordChange)
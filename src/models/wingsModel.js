const mongoose = require("mongoose");
const wingsSchema = new mongoose.Schema({
   
    companyName:{
        type:String,
        required:true
    },
    membershipNo:{
        type:String,
        required:true
    },
    validUpto:{
        type:String,
        required:true
    },
    wingName:{
        type:String,
        required:true
    },
    purposeOfRequest:{
        type:String,
        required:true
    },
    modeOfCommunication:{
        type:Array,
        // required:true
    },
    consultationDate:{
        type:String,
        required:true
    },
    consultationTime:{
        type:String,
        required:true
    },
    briefOfCase:{
        type:String,
        required:true
    },
    generateTicketNo:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model("wings",wingsSchema);

const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    "companyName":{
        type:String,
        required:true,
        trim : true
    },
    "GSTNo":{
        type:String,
        required:true,
        trim : true
    },
    "IECNo":{
        type:String,
        required:true,
        trim : true
    },
    "websiteAdd":{
        type:String,
        required:true,
        trim : true
    },
    "address1":{
        type:String,
        required:true,
        trim : true
    },
    "address2":{
        type:String,
        required:true,
        trim : true
    },
    "address3":{
        type:String,
        trim : true
    },
    "address4":{
        type:String,
        trim : true
    },
    "country":{
        type:String,
        required:true,
        trim : true
    },
    "state":{
        type:String,
        required:true,
        trim : true
    },
    "pinCode":{
        type:Number,
        required:true,
        trim : true
    },
    "businessCategory":{
        type:String,
        required:true,
        trim : true
    },
    "howDidYouKnowAboutUs":{
        type:String,
        // required:true,
        trim : true
    },
    "title":{
        type:String,
        required:true,
        trim : true
    },
    "firstName":{
        type:String,
        required:true,
        trim : true
    },
    "surName":{
        type:String,
        // required:true,
        trim : true
    },
    "role":{
        type:String,
        required:true,
        trim : true
    },
    "email":{
        type:String,
        required:true,
        trim : true
    },
    "password":{
        type:String,
        required:true,
        trim : true
    },
    "confirmPassword":{
        type:String,
        required:true,
        trim : true
    },
    "telephoneNo":{
        type:Number,
        required:true,
        trim : true
    },
    "phoneNo":{
        type:Number,
        required:true,
        trim : true
    },
    "registeredBank":{
        type:String,
        required:true,
        trim : true
    },
    "branchDetails":{
        type:{
            registeredAccountNo : String,
            branchName : String
        },
        required:true,
        trim : true
    }
},{timestamps:true});

module.exports = mongoose.model("client", clientSchema)
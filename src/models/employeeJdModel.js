const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const employeeJdSchema = new mongoose.Schema({
    // companyLogo:{
    //     type:String,
    //     // required:true
    // },
    employeeName:{
        //get data through reference and populate
        type:objectId,
        ref:"administration"
    },
    Designation:{
        //get data through reference and populate
        type:objectId,
        ref:"administration"
    },
    timeIn : {
        type: String,  
        default:Date.now(),
        required:true
    },
    jobRole : {
        type:String,
        required: true,
        trim:true
    },
    jobDescription:{
        type:String,
        required:true,
        trim:true
    },
    // timeOut:{
    //     type:String,
    //     default:Date.now(),
    //     required: true
    // },
    preparedBy : {       
        //get data through reference and populate
        type:objectId,
        ref:"administration"
    },
    isDeleted:{
        type:Boolean, 
        default:false

    }
},{timestamps:true});

module.exports = mongoose.model("employeeJd",employeeJdSchema);
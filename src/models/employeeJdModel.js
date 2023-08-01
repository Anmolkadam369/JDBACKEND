const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const employeeJdSchema = new mongoose.Schema({
    // companyLogo:{
    //     type:String,
    //     // required:true
    // },
    employeeName:{
        //get data through reference and populate
        type:String,
        required: true,
        trim:true
        
    },
    Designation:{
        //get data through reference and populate
        type:String,
        required: true,
        trim:true
        
    },
    timeIn : {
        type: String,  
        required:true
    },
    jobRole : {
        type:String,
        trim:true
    },
    jobDescription:{
        type:String,
        trim:true
    },
    preparedBy : {       
        //get data through reference and populate
        type:String, 
        required:true,
        trim:true
    },
    isDeleted:{
        type:Boolean, 
        default:false

    }
},{timestamps:true});

module.exports = mongoose.model("employeeJd",employeeJdSchema);
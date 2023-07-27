let mongoose = require('mongoose')
let employeeJdModel = require("../models/employeeJdModel");
let jwt = require("jsonwebtoken");
let bcrypt = require('bcrypt');

const createEmployeeJd= async (req,res)=>{
    try {
        let employeeJd = req.body;
        console.log(employeeJd);
        let {jobRole, jobDescription}=employeeJd;
        let logInTime = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
        employeeJd.timeIn = logInTime;


        if(!jobRole)
        return res.status(400).send({status:false, message:"job role is required"});
        // if(jobRole != "string")
        // return res.status(400).send({status:false, message:"job role is required"});
        if(jobRole == "")
        return res.status(400).send({status:false, message:"job role is required"});

        //______________________________________________________________________________

        if(!jobDescription)
        return res.status(400).send({status:false, message:"job Description is required bro2"});
        // if(jobDescription != "string")
        // return res.status(400).send({status:false, message:"job Description is required"});
        if(jobDescription == "")
        return res.status(400).send({status:false, message:"job Description is required bro"});
        let createdJd = await employeeJdModel.create(employeeJd);
        return res.status(200).send({status:true, message:"JD Created", data:createdJd})

    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

const getJdData = async (req,res)=>{
    try {
        let adminData = await adminModel.findOne({});
        return res.status(200).send({status: true, message: "get admin data", data: adminData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}


module.exports = {createEmployeeJd};
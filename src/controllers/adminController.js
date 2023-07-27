const mongoose = require('mongoose')
const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
//const validation = require("../validations/validation");
const registerAdmin = async ( req, res) =>{
  try{
    let adminData = req.body;
    console.log("anmol")
    console.log(adminData)
    let {fname, lname, profileImage, email, password} = adminData;
    if (!fname)
      return res.status(400).send({ status: false, message: "first name is mandatory" });

    if (!lname)
      return res.status(400).send({ status: false, message: "last name is mandatory" });


//________________________________________________________
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
    if(typeof(email) != "string"){
      return res.status(400).send({status: false, message:" please send proper email"})
    }
    email = adminData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof (password) != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = adminData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    adminData.password = hashing;
//_____________________________________________________

     let isAdminExist = await adminModel.findOne({ email: email });

    if (isAdminExist) {
      if (isAdminExist.email == email)
        return res.status(400).send({ status: false, message: "email id already exist, send another email" });
  }
    //   adminData.profileImage = req.image;
    let adminCreated = await adminModel.create(adminData);
    return res.status(200).send({status: true ,message:"user got created ", data : adminCreated})
}
  catch(error){
    return res.status(500).send({status: false, message: error.message});
  }
}

const loginAdmin = async(req,res)=>{
  try{
    let loginData = req.body;
    let{email, password} = loginData;
    //________________________________________________________
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
    if(typeof(email) != "string"){
      return res.status(400).send({status: false, message:" please send proper email"})
    }
    email = loginData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = loginData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    // let hashing = bcrypt.hashSync(password, 10);
    // userData.password = hashing;
//_____________________________________________________\
    let isAdminExists = await adminModel.findOne({email:email});
    if(!isAdminExists)
      return res.status(404).send({status:false, message:"Email doesn't exists "})

    let passwordCompare = await bcrypt.compare(password, isAdminExists.password)
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {adminId : isAdminExists.email,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdminExists._id, token: token };

    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Admin login successfully", data: tokenInfo });
}
    
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

const getAdminDetails = async (req,res)=>{
  try{
      let adminData = await adminModel.find();
      return res.status(200).send({status: true, message: "get admin data", data: adminData})
  }
  catch(error){
    return res.status(500).send({status: false, message: error.message})
  }
}

module.exports = {registerAdmin,loginAdmin,getAdminDetails};
  
let mongoose = require('mongoose')
let superAdminModel = require("../models/superAdminModel");
let jwt = require("jsonwebtoken");
let bcrypt = require('bcrypt')
//let validation = require("../validations/validation");
const registerSuperAdmin = async ( req, res) =>{
  try{
    let superAdminData = req.body;
    let {fname, lname, profileImage, email, password} = superAdminData;
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
    email = superAdminData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = superAdminData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    superAdminData.password = hashing;
//_____________________________________________________

     let superAdminExist = await superAdminModel.findOne({ email: email });

    if (superAdminExist) {
      if (superAdminExist.email == email)
        return res.status(400).send({ status: false, message: "email id  already exist, send another email" });
  }
      superAdminData.profileImage = req.image;
    let superAdminCreated = await superAdminModel.create(superAdminData);
    return res.status(200).send({status: true ,message:"user got created ", data : superAdminCreated})
    
}
  catch(error){
    return res.status(500).send({status: false, message: error.message});
  }
}

const loginSuperAdmin = async(req,res)=>{
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

    // Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    loginData.password = hashing;
//_____________________________________________________
    let isSuperAdminExists = await superAdminModel.findOne({email:email});
    if(!isSuperAdminExists)
      return res.status(404).send({status:false, message:"Email doesn't exists "})

    let passwordCompare = await bcrypt.compare(password, isSuperAdminExists.password)
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {adminId : isSuperAdminExists.email,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecuritysuperAdmin");
     let tokenInfo = { userId: isSuperAdminExists._id, token: token };

    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Admin login successfully", data: tokenInfo });
}
    
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

const getCompanyDetailsForsuperAdmin = async (req, res) => {
  try {
      let clientId = req.params;
      if (!clientId) return res.status(400).send({ status: false, message: "Please Enter clientId value" });
      let clientCompanyDetails = await clientModel.findById(clientId);
      if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
     
      
      return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

const filledBysuperAdmin = async (req, res)=>{
  try {
    let clientId = req.params;
    let data = req.body;
    let {approvedBySuperAdmin}=data;
      
      if(approvedBySuperAdmin){
       approvedBySuperAdmin  = data.approvedBySuperAdmin = approvedBySuperAdmin ;
      if (!clientId) return res.status(400).send({ status: false, message: "Please Enter clientId value" });
      let clientCompanyDetails = await clientModel.findOneAndUpdate({_id:clientId},{$set:{approvedBySuperAdmin:approvedBySuperAdmin}},{new:true});
      if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "Data updated successfully", data: clientCompanyDetails });
      }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}
module.exports = {registerSuperAdmin, loginSuperAdmin,getCompanyDetailsForsuperAdmin,filledBysuperAdmin};
  
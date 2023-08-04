const mongoose = require ("mongoose");
// const dateTime = require("node-datetime")
const administrationModel = require ('../models/administrationModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const employeeJdModel = require("../models/employeeJdModel");
// const validation = require("../validations/validation");
const registerAdministration = async (req, res)=>{
  try{
    let registerAdministrationInfo = req.body;
    let {profileImage,departmentName,officerName,employeeId,emailId,userName,password,designation,date,signature} = registerAdministrationInfo;
      //registration of an employee his/her photo
    //registerAdministration.profileImage = req.image;
    //____________________
    
//____________________departmentName __________
    if(!departmentName)
      return res.status(400).send({status: false, message: "departmentName is required"});

     if (departmentName == "")
      return res.status(400).send({ status: false, message: "Please Enter departmentName value" });

    
    if(typeof(departmentName) != "string")
      return res.status(400).send({status: false, message: "departmentName should be in String"});
    
    let expectedValues = ["Adminstration","HR Department", "co Department","Membership Department", "wings Department", "Accounts Department", "publications", "Miscellaneous"];
    
   let answers = departmentName
   console.log("answers ", answers)
    let count = 0;
    for(let i=0; i<expectedValues.length; i++){
      console.log(expectedValues[i]);
      if(expectedValues[i]==departmentName)
        count++;
    }
    console.log("count ", count)
    if(count != 1) return res.status(400).send({status:false, message:"please provide correct information 111111."});
    let values = [];
    if(departmentName == "Adminstration"){
      values = [];
    }
    if(departmentName == "HR Department"){
      values = [];
    }
    if(departmentName == "co Department"){
      values = ["Billing","Document Checking","e-platform","Attestation"];
    }
    if(departmentName == "Membership Department"){
      values = [];
    }
    if(departmentName == "wings Department"){
      values = ["Recruit candidates", "Hire the right employees", "Conduct disciplinary actions","Update policies","Maintain employee records", "On Boarding New Employees" ];
    }
    if(departmentName == "Accounts Department"){
      values = ["Tally","Payment Follow Up","Ledger","Billing"];
    }
    if(departmentName == "publications"){
      values = ["Daily Newsletter","Weekly Newsletter","Quarterly Newsletter", "Designing"];
    }
    if(departmentName == "Miscellaneous"){
      values = [];
    }
    //______________________________

    if(!officerName) 
      return res.status(400).send({status: false, message: "officerName is required"});

     if(typeof(officerName) != "string")
      return res.status(400).send({status: false, message: "officerName should be in String"});

    if (officerName == "")
      return res.status(400).send({ status: false, message: "Please Enter officerName value" });

    //______________________________
      
    if(!employeeId) 
      return res.status(400).send({status: false, message: "employeeId is required"});

      console.log(typeof(employeeId));
     if(typeof(employeeId) != "number")
      return res.status(400).send({status: false, message: "employeeId should be in Number"});

    if (employeeId == "")
      return res.status(400).send({ status: false, message: "Please Enter employeeId value" });

    //______________________________
     if(!emailId) 
      return res.status(400).send({status: false, message: "emailId is required"});

     if(typeof(emailId) != "string")
      return res.status(400).send({status: false, message: "emailId should be in String"});

    if (emailId == "")
      return res.status(400).send({ status: false, message: "Please Enter emailId value" });

      let isEmployeeExist = await administrationModel.findOne({ emailId: emailId });

      if (isEmployeeExist) {
        if (isEmployeeExist.emailId == emailId)
          return res.status(400).send({ status: false, message: "email id already exist, send another email" });
    }
    //______________________________
    if(!designation) 
    return res.status(400).send({status: false, message: "designation is required"});

   if(typeof(designation) != "string")
    return res.status(400).send({status: false, message: "designation should be in String"});

  if (designation == "")
    return res.status(400).send({ status: false, message: "Please Enter designation value" });
    //______________________________

  
    if(!userName) 
      return res.status(400).send({status: false, message: "userName is required"});

     if(typeof(userName) != "string")
      return res.status(400).send({status: false, message: "userName should be in String"});

    if (userName == "")
      return res.status(400).send({ status: false, message: "Please Enter userName value" });
    //______________________________
        if(!password) 
      return res.status(400).send({status: false, message: "password is required"});

     if(typeof(password) != "string")
      return res.status(400).send({status: false, message: "password should be in String"});

    if (password == "")
      return res.status(400).send({ status: false, message: "Please Enter password value" });

    //hashing password 
    let hashing = bcrypt.hashSync(password, 10);
    registerAdministrationInfo.password = hashing; 

    //______________________________
    
    let logInTime = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()
    registerAdministrationInfo.Date = logInTime;
    console.log(values)
    registerAdministrationInfo.tasks = values;
          //registration of an employee his/her photo
    //registerAdministration.signature = req.image;
    //____________________
    console.log([registerAdministrationInfo])
    console.log(registerAdministrationInfo.tasks)

    let employeeCreated = await administrationModel.create(registerAdministrationInfo)
    console.log("employeeCreated : ", employeeCreated)
    // let createdJd = await employeeJdModel.create(employeeJd);

    return res.status(201).send({status:true, message: "user created", data : employeeCreated})
  }
  catch (error){
    return res.status(500).send({status: false, message: error.message});
}
}


const loginAdministration = async(req,res,next)=>{
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
    // let hashing = bcrypt.hashSync(password, 10);
    // loginData.password = hashing;
//_____________________________________________________
console.log("email", email)
    // let isAdministrationExist = await administrationModel.findOne({email:email});
    let isAdministrationExist = await administrationModel.findOne({emailId:email})
    console.log("bruh",isAdministrationExist)
    if(!isAdministrationExist)
      return res.status(404).send({status:false, message:"Email doesn't exists "})


    let passwordCompare = await bcrypt.compare(password, isAdministrationExist.password)
    console.log(passwordCompare);
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {administrationId : isAdministrationExist._id,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdministrationExist._id, token: token };
     console.log(tokenInfo);

    res.setHeader('x-api-key', token)
        //__________________________________________________________________

        if(isAdministrationExist.emailId == "hr@aecci.org.in")
        next()
            
      //__________________________________________________________________

    return res.status(200).send({ status: true, message: `${isAdministrationExist.officerName} login successfully`, data: tokenInfo });
}
catch(error){
  return res.status(500).send({status:false, message:error.message})
}
}


const loginHR = async(req,res)=>{
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
    // let hashing = bcrypt.hashSync(password, 10);
    // loginData.password = hashing;
//_____________________________________________________
console.log("email", email)
    // let isAdministrationExist = await administrationModel.findOne({email:email});
    let isAdministrationExist = await administrationModel.findOne({emailId:email})
    console.log("bruh",isAdministrationExist)
    if(!isAdministrationExist)
      return res.status(404).send({status:false, message:"Email doesn't exists "})
      if(isAdministrationExist.emailId != "hr@aecci.org.in")
      return res.status(400).send({message:false, message:"This is authorized for HR only"})

    let passwordCompare = await bcrypt.compare(password, isAdministrationExist.password)
    console.log(passwordCompare);
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {administrationId : isAdministrationExist._id,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdministrationExist._id, token: token };
     console.log(tokenInfo);

    res.setHeader('x-api-key', token)
        //__________________________________________________________________

       
      
      //__________________________________________________________________

    return res.status(200).send({ status: true, message: `${isAdministrationExist.officerName} login successfully`, data: tokenInfo });
}
catch(error){
  return res.status(500).send({status:false, message:error.message})
}
}





const getMyaccount = async (req,res)=>{
  const employeeId = req.params.employeeId;
    console.log(employeeId)
  let getInfo = await administrationModel.findById(employeeId);
  if(!getInfo)return res.status(400).send({status: false, message:"No user Found"});
  res.status(200).send({status:true, message:`${getInfo.officerName} 's information !`, data : getInfo })
}

const getWantedAdministrationList = async (req,res)=>{
  try{
    const employeeId = req.params.employeeId;
    console.log(employeeId)
     
    let getInfo = await employeeJdModel.find({employeeId:employeeId});
    console.log(getInfo)
    if(!getInfo)return res.status(400).send({status: false, message:"No user Found"})
  res.status(200).send({status:true, message: "employees information ", data : getInfo })
  }
   catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

const updateInfo = async (req,res)=>{
     try{
      let values=[];
       let paramsId = req.params.paramsId;
    let updateEmployeeInfo = req.body;
    let {profileImage,departmentName,officerName,userName,password,date,signature,employeeId,tasks, emailId,designation} = updateEmployeeInfo;
      //registration of an employee his/her photo
    //registerAdministration.profileImage = req.image;
    //____________________
    
//____________________departmentName __________
    if(departmentName){
     if (departmentName == "")
      return res.status(400).send({ status: false, message: "Please Enter departmentName value" });

    if(typeof(departmentName) != "string")
      return res.status(400).send({status: false, message: "departmentName should be in String"});
    
    let expectedValues = ["Adminstration", "co Department","Membership Department", "wings Department", "Accounts Department", "publications", "Miscellaneous"];
    
   let answers = departmentName
   console.log("answers ", answers)
    let count = 0;
    for(let i=0; i<expectedValues.length; i++){
      console.log(expectedValues[i]);
      if(expectedValues[i]==departmentName)
        count++;
    }
    console.log("count ", count)
    if(count != 1) return res.status(400).send({status:false, message:"please provide correct information 111111."});
   
    if(departmentName == "Adminstration"){
      values = [];
    }
    if(departmentName == "co Department"){
      values = ["Billing","Document Checking","e-platform","Attestation"];
    }
    if(departmentName == "Membership Department"){
      values = [];
    }
    if(departmentName == "wings Department"){
      values = ["Recruit candidates", "Hire the right employees", "Conduct disciplinary actions","Update policies","Maintain employee records", "On Boarding New Employees" ];
    }
    if(departmentName == "Accounts Department"){
      values = ["Tally","Payment Follow Up","Ledger","Billing"];
    }
    if(departmentName == "publications"){
      values = ["Daily Newsletter","Weekly Newsletter","Quarterly Newsletter", "Designing"];
    }
    if(departmentName == "Miscellaneous"){
      values = [];
    }
    }
    //______________________________

    if(officerName){ 

     if(typeof(officerName) != "string")
      return res.status(400).send({status: false, message: "officerName should be in String"});

    if (officerName == "")
      return res.status(400).send({ status: false, message: "Please Enter officerName value" });
}
    //______________________________
      
    if(employeeId) {
      console.log(typeof(employeeId))
     if(typeof(employeeId) != "number")
      return res.status(400).send({status: false, message: "employeeId should be in Number"});

    if (employeeId == "")
      return res.status(400).send({ status: false, message: "Please Enter employeeId value" });
}
    //______________________________
      if(emailId){
        if(typeof(emailId) != "string")
        return res.status(400).send({status: false, message: "emailId should be in String"});
  
      if (emailId == "")
        return res.status(400).send({ status: false, message: "Please Enter emailId value" });
  
        let isEmployeeExist = await administrationModel.findOne({ emailId: emailId });
  
        if (isEmployeeExist) {
          if (isEmployeeExist.emailId == emailId)
            return res.status(400).send({ status: false, message: "email id already exist, send another email" });
      }
    }
    //______________________________

      if(designation){
        if(typeof(designation) != "string")
    return res.status(400).send({status: false, message: "designation should be in String"});

  if (designation == "")
    return res.status(400).send({ status: false, message: "Please Enter designation value" });
      }

    //______________________________
  
    if(userName) { 
     if(typeof(userName) != "string")
      return res.status(400).send({status: false, message: "userName should be in String"});

    if (userName == "")
      return res.status(400).send({ status: false, message: "Please Enter userName value" });
    }
    //______________________________
    if(password){ 
     if(typeof(password) != "string")
      return res.status(400).send({status: false, message: "password should be in String"});

    if (password == "")
      return res.status(400).send({ status: false, message: "Please Enter password value" });
       
    //hashing password 
      let hashing = bcrypt.hashSync(password, 10);
      password = updateEmployeeInfo.password = hashing;
    console.log(updateEmployeeInfo.password)
    }

    //______________________________
    console.log("values :", values)
    tasks = updateEmployeeInfo.tasks = values;
          //registration of an employee his/her photo
    //registerAdministration.signature = req.image;
    //____________________
    let updatedEmployee = await administrationModel.findOneAndUpdate({paramsId : employeeId}, {$set:{profileImage:profileImage, departmentName:departmentName, officerName:officerName, employeeId:employeeId,emailId:emailId, designation:designation, userName:userName, password:password, tasks:tasks}}, {new:true});
       
    return res.status(200).send({status:true, message: "user Upadated", data : updatedEmployee})
  }
   catch (error) {
         return res.status(500).send({ status: false, message: error.message })
  }
}

// const deleteEmployee = async (req, res)=>{
//   try {
//     const empolyeeId = req.params.empolyeeId;

//       let getInfo = await administrationModel.findOneAndUpdate({employeeId : empolyeeId, isDeleted:false },{$set:{isDeleted:true, deletedAt : Date.now()}},{new:true});
//      console.log(getInfo)
//       return res.status(200).send({ status: true, message: "success", message: "deleted successfully " , data: getInfo})
//   } catch (error) {
//      return res.status(500).send({ status: false, message: error.message })
//   }
// }

module.exports = {registerAdministration,loginAdministration,loginHR,getMyaccount,getWantedAdministrationList, updateInfo, /*deleteEmployee*/ }



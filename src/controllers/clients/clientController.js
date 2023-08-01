let mongoose = require('mongoose')
let clientEmail = require("../../models/clients/clientModel");
const clientModel = require('../../models/clients/clientModel');
const bcrypt = require('bcrypt');
const clientPasswordChangeModel = require('../../models/clients/clientPasswordChangeModel');
const comercialDirectory = require('../../models/clients/comercialDirectory');



const createClient = async (req, res) => {
    try {
        let clientsAllData = req.body;
        let { companyName, GSTNo, IECNo, websiteAdd, address1, address2, address3, address4, country, state, pinCode, businessCategory, howDidYouKnowAboutUs, title, firstName, surName, role, email, password, confirmPassword, telephoneNo, phoneNo, registeredBank, branchDetails } = clientsAllData;
        //______________companyName________________

        if (!companyName)
            return res.status(400).send({ status: false, message: "companyName is required" });

        if (typeof (companyName) != "string")
            return res.status(400).send({ status: false, message: "companyName should be in String" });

        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName value" });

        //_________________GSTNo_____________


        //_________________IECNo_____________

        //_________________websiteAdd_____________

        if (!websiteAdd)
            return res.status(400).send({ status: false, message: "websiteAdd is required" });

        if (typeof (websiteAdd) != "string")
            return res.status(400).send({ status: false, message: "websiteAdd should be in String" });

        if (websiteAdd == "")
            return res.status(400).send({ status: false, message: "Please Enter websiteAdd value" });

        //_________________add1_____________

        if (!address1)
            return res.status(400).send({ status: false, message: "address1 is required" });

        if (typeof (address1) != "string")
            return res.status(400).send({ status: false, message: "address1 should be in String" });

        if (address1 == "")
            return res.status(400).send({ status: false, message: "Please Enter address1 value" });

        if (!address2)
            return res.status(400).send({ status: false, message: "address2 is required" });

        if (typeof (address2) != "string")
            return res.status(400).send({ status: false, message: "address2 should be in String" });

        if (address2 == "")
            return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        //_________________________________________________________________________
        if (address3) {

            if (typeof (address3) != "string")
                return res.status(400).send({ status: false, message: "address3 should be in String" });

            if (address3 == "")
                return res.status(400).send({ status: false, message: "Please Enter address3 value" });
        }

        if (address4) {
            if (typeof (address4) != "string")
                return res.status(400).send({ status: false, message: "address4 should be in String" });

            if (address4 == "")
                return res.status(400).send({ status: false, message: "Please Enter address4 value" });
        }

        //________________________________country_________________________________________
        if (!country)
            return res.status(400).send({ status: false, message: "country is required" });

        if (typeof (country) != "string")
            return res.status(400).send({ status: false, message: "country should be in String" });

        if (country == "")
            return res.status(400).send({ status: false, message: "Please Enter country value" });

        //________________________________state_________________________________________
        if (!state)
            return res.status(400).send({ status: false, message: "state is required" });

        if (typeof (state) != "string")
            return res.status(400).send({ status: false, message: "state should be in String" });

        if (state == "")
            return res.status(400).send({ status: false, message: "Please Enter state value" });

        //________________________________pinCode_________________________________________

        if (!pinCode)
            return res.status(400).send({ status: false, message: "pinCode is required" });

        if (typeof (pinCode) != "number")
            return res.status(400).send({ status: false, message: "pinCode should be in number" });

        if (pinCode == "")
            return res.status(400).send({ status: false, message: "Please Enter pinCode value" });

        //________________________________businessCategory_________________________________________

        if (!businessCategory)
            return res.status(400).send({ status: false, message: "businessCategory is required" });

        if (typeof (businessCategory) != "string")
            return res.status(400).send({ status: false, message: "businessCategory should be in String" });

        if (businessCategory == "")
            return res.status(400).send({ status: false, message: "Please Enter businessCategory value" });

        //___________________________________howDidYouKnowAboutUs______________________________________
        if (howDidYouKnowAboutUs) {

            if (typeof (howDidYouKnowAboutUs) != "string")
                return res.status(400).send({ status: false, message: "howDidYouKnowAboutUs should be in String" });

            if (howDidYouKnowAboutUs == "")
                return res.status(400).send({ status: false, message: "Please Enter howDidYouKnowAboutUs value" });
        }



        //___________________________________PERSONAL INFO______________________________________

        //___________________________________title______________________________________

        if (!title)
            return res.status(400).send({ status: false, message: "title is required" });

        if (typeof (title) != "string")
            return res.status(400).send({ status: false, message: "title should be in String" });

        if (title == "")
            return res.status(400).send({ status: false, message: "Please Enter title value" });

        //___________________________________firstName______________________________________

        if (!firstName)
            return res.status(400).send({ status: false, message: "firstName is required" });

        if (typeof (firstName) != "string")
            return res.status(400).send({ status: false, message: "firstName should be in String" });

        if (firstName == "")
            return res.status(400).send({ status: false, message: "Please Enter firstName value" });

        //___________________________________surName______________________________________
        if (!surName)
            return res.status(400).send({ status: false, message: "surName is required" });

        if (typeof (surName) != "string")
            return res.status(400).send({ status: false, message: "surName should be in String" });

        if (surName == "")
            return res.status(400).send({ status: false, message: "Please Enter surName value" });


        //___________________________________role______________________________________
        if (!role)
            return res.status(400).send({ status: false, message: "role is required" });

        if (typeof (role) != "string")
            return res.status(400).send({ status: false, message: "role should be in String" });

        if (role == "")
            return res.status(400).send({ status: false, message: "Please Enter role value" });

        //___________________________________email______________________________________

        if (!email)
            return res.status(400).send({ status: false, message: "email is mandatory" });
        if (typeof (email) != "string") {
            return res.status(400).send({ status: false, message: " please send proper email" })
        }
        if (email == "")
            return res.status(400).send({ status: false, message: " please send proper email" })

        let isClientExists = await clientModel.findOne({ email: email });

        if (isClientExists) {
            if (isClientExists.email == email)
                return res.status(400).send({ status: false, message: "email id already exist, send another email" });
        }
        //___________________________________password______________________________________
        if (!password)
            return res.status(400).send({ status: false, message: "password is mandatory" });

        if (typeof (password) != "string")
            return res.status(400).send({ status: false, message: "please provide password in string " });

        if (password == "")
            return res.status(400).send({ status: false, message: "Please provide password value" });
    

           //Encrypting password
           let hashingPassword = bcrypt.hashSync(password, 10);
           clientsAllData.password = hashingPassword;
   
        //regex password
        // if (!validation.validatePassword(password))
        // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });


        //___________________________________confirmPassword______________________________________

        if (!password)
            return res.status(400).send({ status: false, message: "password is mandatory" });

        if (!confirmPassword)
            return res.status(400).send({ status: false, message: "confirmPassword is mandatory" });

        if (typeof (confirmPassword) != "string")
            return res.status(400).send({ status: false, message: "please provide confirmPassword in string " });

        if (confirmPassword == "")
            return res.status(400).send({ status: false, message: "Please provide confirmPassword value" });

        let passwordCompare = await bcrypt.compare(confirmPassword, clientsAllData.password)
        console.log(passwordCompare);
        if(!passwordCompare) 
            return res.status(404).send({status:false, message:"password doesn't match"});
     
        //Encrypting confirmpassword
        let hashingconfirmPassword = bcrypt.hashSync(password, 10);
        clientsAllData.confirmPassword = hashingconfirmPassword;

        //___________________________________telephoneNo______________________________________
        if (!telephoneNo)
            return res.status(400).send({ status: false, message: "telephoneNo is required" });

        if (typeof (telephoneNo) != "number")
            return res.status(400).send({ status: false, message: "telephoneNo should be in number" });

        if (telephoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter telephoneNo value" });

        //___________________________________PhoneNo______________________________________
        if (!phoneNo)
            return res.status(400).send({ status: false, message: "phoneNo is required" });

        if (typeof (phoneNo) != "number")
            return res.status(400).send({ status: false, message: "phoneNo should be in number" });

        if (phoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter phoneNo value" });

        //___________________________________registeredBank______________________________________
        if (!registeredBank)
            return res.status(400).send({ status: false, message: "registeredBank is required" });

        if (typeof (registeredBank) != "string")
            return res.status(400).send({ status: false, message: "registeredBank should be in String" });

        if (registeredBank == "")
            return res.status(400).send({ status: false, message: "Please Enter registeredBank value" });




        //___________________________________branchDetails______________________________________
        if (!branchDetails)
            return res.status(400).send({ status: false, message: "branchDetails is required" });

        if (typeof (branchDetails) != "string")
            return res.status(400).send({ status: false, message: "branchDetails should be in String" });

        if (branchDetails == "")
            return res.status(400).send({ status: false, message: "Please Enter branchDetails value" });

        let accNo = branchDetails.registeredAccountNo;

        if (!accNo)
            return res.status(400).send({ status: false, message: "accNo is required" });

        if (typeof (accNo) != "string")
            return res.status(400).send({ status: false, message: "accNo should be in String" });

        if (accNo == "")
            return res.status(400).send({ status: false, message: "Please Enter accNo value" });

        let branch = branchDetails.branchName;

        if (!branch)
            return res.status(400).send({ status: false, message: "branch is required" });

        if (typeof (branch) != "string")
            return res.status(400).send({ status: false, message: "branch should be in String" });

        if (branch == "")
            return res.status(400).send({ status: false, message: "Please Enter branch value" });


        let clientCreated = await clientModel.create(clientsAllData);
        return res.status(201).send({ status: true, message: "client got created ", data: clientCreated })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCompanyDetails = async (req, res) => {
    try {
        let clientId = req.params;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });

        let clientCompanyDetails = await clientModel.findById(clientId).select({_id:0, companyName: 1, GSTNo: 1, IECNo: 1, websiteAdd: 1, address1: 1, address2: 1, address3: 1, address4: 1, country: 1, state: 1, pinCode: 1, businessCategory: 1, howDidYouKnowAboutUs: 1 });
        if (!clientCompanyDetails)
            return res.status(404).send({ status: false, message: "No data found" });

        return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getClientPersonalInfo = async (req, res) => {
    try {
        let clientId = req.params;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });

        let clientPersonalDetails = await clientModel.findById(clientId).select({_id:0, title:1, firstName:1, surName:1, role:1, email:1, password:1, confirmPassword:1, telephoneNo:1, phoneNo:1, registeredBank:1, branchDetails:1});
        if (!clientPersonalDetails)
            return res.status(404).send({ status: false, message: "No data found" });

        return res.status(200).send({ status: true, message: "here's personal Details", data: clientPersonalDetails });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const changePassword = async (req,res)=>{
    try {
        let clientId = req.params;
        let changePasswordInfo = req.body;
        let {currentPassword, newPassword, confirmPassword} = changePasswordInfo;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });

        //__________________________currentPassword__________________________
        if (!currentPassword)
            return res.status(400).send({ status: false, message: "currentPassword is required" });

        if (typeof (currentPassword) != "string")
            return res.status(400).send({ status: false, message: "currentPassword should be in String" });

        if (currentPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter currentPassword value" });

         //__________________________newPassword__________________________
         if (!newPassword)
         return res.status(400).send({ status: false, message: "newPassword is required" });

     if (typeof (newPassword) != "string")
         return res.status(400).send({ status: false, message: "newPassword should be in String" });

     if (newPassword == "")
         return res.status(400).send({ status: false, message: "Please Enter newPassword value" });

         //__________________________confirmPassword__________________________
         if (!confirmPassword)
         return res.status(400).send({ status: false, message: "confirmPassword is required" });

        if (typeof (confirmPassword) != "string")
            return res.status(400).send({ status: false, message: "confirmPassword should be in String" });

        if (confirmPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter confirmPassword value" });

        let clientPersonalDetails = await clientModel.findById(clientId);
        if (!clientPersonalDetails)
            return res.status(404).send({ status: false, message: "No data found" });

        let passwordCompare = await bcrypt.compare(currentPassword, clientPersonalDetails.password)
        console.log(passwordCompare);
      if(!passwordCompare) 
        return res.status(404).send({status:false, message:"password doesn't match"});
        let passwordChanged = await clientPasswordChangeModel.create(clientsAllData);
        
        return res.status(200).send({ status: true, message: "Your password will be updated in 24 hours"});

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const commercialDir = async (req,res)=>{
    try {
        let dirInfo = req.body;
        let {companyLogo,companyName,ownersName,email,establishmentYear,companyAdd,mobileNo,companyProduct,companyActivity}=dirInfo;
        
        //__________________________companyLogo_______________________
        if (!companyLogo)
        return res.status(400).send({ status: false, message: "companyLogo is required" });

    if (typeof (companyLogo) != "string")
        return res.status(400).send({ status: false, message: "companyLogo should be in String" });

    if (companyLogo == "")
        return res.status(400).send({ status: false, message: "Please Enter companyLogo value" });

  //__________________________name_______________________
  if (!companyName)
  return res.status(400).send({ status: false, message: "companyName is required" });

if (typeof (companyName) != "string")
  return res.status(400).send({ status: false, message: "companyName should be in String" });

if (companyName == "")
  return res.status(400).send({ status: false, message: "Please Enter companyName value" });

  //__________________________ownerName_______________________
  if (!ownersName)
  return res.status(400).send({ status: false, message: "ownersName is required" });

if (typeof (ownersName) != "string")
  return res.status(400).send({ status: false, message: "ownersName should be in String" });

if (ownersName == "")
  return res.status(400).send({ status: false, message: "Please Enter ownersName value" });

  
  //__________________________email_______________________
  if (!email)
  return res.status(400).send({ status: false, message: "email is required" });

if (typeof (email) != "string")
  return res.status(400).send({ status: false, message: "email should be in String" });

if (email == "")
  return res.status(400).send({ status: false, message: "Please Enter email value" });

  let isClientExists = await clientModel.findOne({ email: email });
if(!isClientExists)   return res.status(404).send({ status: false, message: "email not Found" });


  //__________________________est year_______________________
  if (!establishmentYear)
  return res.status(400).send({ status: false, message: "establishmentYear is required" });

if (typeof (establishmentYear) != "number")
  return res.status(400).send({ status: false, message: "establishmentYear should be in number" });

if (establishmentYear == "")
  return res.status(400).send({ status: false, message: "Please Enter establishmentYear value" });
  //__________________________Mobile No_______________________
  if (!mobileNo)
  return res.status(400).send({ status: false, message: "mobileNo is required" });

if (typeof (mobileNo) != "number")
  return res.status(400).send({ status: false, message: "mobileNo should be in number" });

if (mobileNo == "")
  return res.status(400).send({ status: false, message: "Please Enter mobileNo value" });
  //__________________________product_______________________
  if (!companyProduct)
  return res.status(400).send({ status: false, message: "companyProduct is required" });

if (typeof (companyProduct) != "string")
  return res.status(400).send({ status: false, message: "companyProduct should be in String" });

if (companyProduct == "")
  return res.status(400).send({ status: false, message: "Please Enter companyProduct value" });
  //__________________________activity_______________________
  if (!companyActivity)
  return res.status(400).send({ status: false, message: "companyActivity is required" });

if (typeof (companyActivity) != "string")
  return res.status(400).send({ status: false, message: "companyActivity should be in String" });

if (companyActivity == "")
  return res.status(400).send({ status: false, message: "Please Enter companyActivity value" });


  let dirCreated = await comercialDirectory.create(dirInfo);
  return res.status(201).send({ status: true, message: "directory got created ", data: dirCreated });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
        
    }
}

// const seeCommercialDir = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
        
//     }
// }




module.exports = { createClient,getCompanyDetails, getClientPersonalInfo,changePassword,commercialDir};
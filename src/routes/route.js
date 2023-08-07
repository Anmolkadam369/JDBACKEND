const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const superAdminController =require("../controllers/superAdminController");
const administrationController = require("../controllers/administrationController");
const employeeJdController = require("../controllers/employeeJdController");
const clientController = require("../controllers/clients/clientController")
const clientEmailController = require("../controllers/clients/clientEmailController");
const clientGSTNoController = require("../controllers/clients/clientGSTNoController");
const recomendationLetterController= require("../controllers/clients/recomendationletterController");
const auth = require("../middleware/auth");
const aws = require("../middleware/aws")

// const auth = require('../middlewares/auth')
//const aws = require("../middlewares/awsLink");

router.get("/test-me", function(req,res){
    res.send({status: false, message:"just testing"})
})
//ADMIN
router.post("/registerAdmin",  adminController.registerAdmin);
router.get("/loginAdmin", adminController.loginAdmin);
router.get("/getAdminDetails", adminController.getAdminDetails)

//SUPERADMIN
router.post("/registerSuperAdmin",  superAdminController.registerSuperAdmin);
router.get("/loginSuperAdmin",superAdminController.loginSuperAdmin);

//Employee
router.post("/registerAdministration",aws.awsLinkEmployeeProfile,aws.awsLinkEmployeeSignature, administrationController.registerAdministration);
router.get("/loginAdministration", administrationController.loginAdministration, administrationController.getWantedAdministrationList)
router.get("/loginHR", administrationController.loginHR)
router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
// router.get("/getWantedAdministrationList/:employeeId", administrationController.getWantedAdministrationList);
router.put("/updateInfo/:paramsId", administrationController.updateInfo);
// router.delete("/deleteEmployee/:employeeId", administrationController.deleteEmployee);
router.post ("/administration/forgotPassword", administrationController.forgotPasword)
// router.post ("administration/resetPassword", administrationController.resetPassword)

// JD 
//for first Time clicking
router.post("/createEmployeeJd/:employeeId",auth.authentication,auth.authorization, employeeJdController.createEmployeeJd );
//for next Line of JD
router.post("/createAnotherOne/:employeeId",auth.authentication,auth.authorization,employeeJdController.createEmployeeJdForNextTime )
router.post ("/logOutJd/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.logOut);
router.post("/thirtyMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.thirtyMinTimesUp);
router.post("/fifteenMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.fifteenMinTimesUp);



//HR 
router.post("/extendedTime/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.extendTime);
router.get("/getWantedAdministrationList/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedAdministrationList);

//need to add employeeId in path but now in this case we are simply checking it
router.get("/getWantedAdministrationList/:normalEmployee",employeeJdController.getWantedAdministrationList);
router.get("/getWantedListByDate/:normalEmployee",employeeJdController.getWantedAdministrationList)




//client
router.post("/createClient", clientController.createClient);
router.get("/getCompanyDetails/clientId",clientController.getCompanyDetails);
router.get("getpersonalinfo/:clientId",clientController.getClientPersonalInfo);
router.put("/changePassword/:clientId",clientController.changePassword);
router.post("/commercialDir/:id" ,clientController.commercialDir);


//clientEmail
router.post("/createClientEmail", clientEmailController.createClientEmail);

// clientGSTNo
// router.post("/createGSTNo", clientGSTNoController.createGSTNo); 

//recommendationLetter
router.post("/createRecommendationLetter",recomendationLetterController.createRecomendationLetter);
router.get("/viewData/:id", recomendationLetterController.viewData);
router.put("/updateData/:id", recomendationLetterController.updateData);

router.all("*/", async(req,res)=>{
    return res.status(400).send({status: false, message:"invalid path"})
})
module.exports = router;
// router.all('*/', function(req, res){
//     return res.status(400).send({status:false, message:"Invalid Path"})
// })

const express = require("express");
const router = express.Router();
const administrationController = require("../controllers/administrationController");
const employeeJdController = require("../controllers/employeeJdController");
const auth = require("../middleware/auth");
const aws = require("../middleware/aws")
const bulk = require("../controllers/bulk")
router.post("/bulk", bulk.sendingMailToUser )
router.post("/nothing",bulk.nothing);
router.post('/create-payment-intent', bulk.payment);

router.get("/test-me", function(req,res){
    res.send({status: false, message:"just testing"})
})

//Employee
router.post("/registerAdministration",aws.awsLinkEmployeeProfile,aws.awsLinkEmployeeSignature,administrationController.registerAdministration);
router.post("/loginAdministration", administrationController.loginAdministration)
router.post("/loginHR", administrationController.loginHR)
router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
router.post ("/administration/forgotPassword", administrationController.forgotPasword)
router.get ("/administration/resetPassword/:token", administrationController.resetPassword)

// JD 
//for first Time clicking
router.post("/createEmployeeJd/:employeeId",auth.authentication,auth.authorization, employeeJdController.createEmployeeJd );
//for next Line of JD
// router.post("/createAnotherOne/:employeeId",auth.authentication,auth.authorization,employeeJdController.createEmployeeJdForNextTime )
router.get ("/logOutJd/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.logOut);
// router.post("/thirtyMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.thirtyMinTimesUp);
// router.post("/fifteenMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.fifteenMinTimesUp);
 
//HR 
router.post("/giveDataOfEmployee/:employeeId",auth.authentication,auth.authorizationForHr,employeeJdController.giveDataOfEmployee)
router.get("/getAllEmpData/:employeeId",auth.authentication,auth.authorizationForHr,administrationController.getEmpData);
router.put("/updateInfo/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr, administrationController.updateInfo);
// router.post("/extendedTime/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.extendTime);
router.get("/getWantedAdministrationList/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedAdministrationList);
router.get("/getWantedListByDate/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedListByDate)
router.delete("/deleteEmp/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,administrationController.deleteEmployee)


router.all("*/", async(req,res)=>{
    return res.status(404).send({status: false, message:"invalid path"})
})



module.exports = router;

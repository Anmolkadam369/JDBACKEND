const express = require("express");
const router = express.Router();
const administrationController = require("../controllers/administrationController");
const employeeJdController = require("../controllers/employeeJdController");
const auth = require("../middleware/auth");
const aws = require("../middleware/aws")

router.get("/test-me", function(req,res){
    res.send({status: false, message:"just testing"})
})

//Employee
router.post("/registerAdministration",aws.awsLinkEmployeeProfile,aws.awsLinkEmployeeSignature, administrationController.registerAdministration);
router.post("/loginAdministration", administrationController.loginAdministration)
router.post("/loginHR", administrationController.loginHR)
router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
router.put("/updateInfo/:paramsId", administrationController.updateInfo);

// NOT DONE YET
// router.post ("/administration/forgotPassword", administrationController.forgotPasword)
// router.get ("/administration/resetPassword/:token", administrationController.resetPassword)

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
router.get("/getWantedListByDate/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedListByDate)

router.all("*/", async(req,res)=>{
    return res.status(400).send({status: false, message:"invalid path"})
})



module.exports = router;

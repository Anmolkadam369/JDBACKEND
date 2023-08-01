const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const superAdminController =require("../controllers/superAdminController");
const administrationController = require("../controllers/administrationController");
const employeeJdController = require("../controllers/employeeJdController");
const clientEmailController = require("../controllers/clients/clientEmailController");
const clientGSTNoController = require("../controllers/clients/clientGSTNoController")
const auth = require("../middleware/auth")

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
router.post("/registerAdministration", administrationController.registerAdministration);
router.get("/loginAdministration", administrationController.loginAdministration)
router.get("/getadministrationList", auth.authentication,administrationController.getadministrationList);
router.get("/getWantedAdministrationList/:administrationId", administrationController.getWantedAdministrationList);
router.put("/updateInfo/:paramsId", administrationController.updateInfo);
// router.delete("/deleteEmployee/:employeeId", administrationController.deleteEmployee);
           
// JD 
router.post("/createEmployeeJd/:employeeID", employeeJdController.createEmployeeJd );
router.post ("/logOutJd/:jdId", employeeJdController.logOut);
router.get("/thirtyMin/:jdId", employeeJdController.thirtyMinTimesUp);
router.get("/fifteenMin/:jdId", employeeJdController.fifteenMinTimesUp);

//clientEmail
router.post("/createClientEmail", clientEmailController.createClientEmail);

// clientGSTNo
router.post("/createGSTNo", clientGSTNoController.createGSTNo); 


router.all("*/", async(req,res)=>{
    return res.status(400).send({status: false, message:"invalid path"})
})
module.exports = router;
// router.all('*/', function(req, res){
//     return res.status(400).send({status:false, message:"Invalid Path"})
// })

const mongoose = require ("mongoose");
const clientModel = require("../models/clients/clientModel");

const memberShipServices = async (req,res, next)=>{
    try {
        let clientId = req.params.clientId;
        let clientData = await clientModel.findById(clientId);
        if(!clientData) return res.status(404). send({status:false, message: "No Data found"});
        if(clientData.selectMembership !== "Digital User") res.status(200).send ({status:true, message:"certificate page", data:clientData});
        res.status(200).send ({status:true, message:"digital user", data:clientData});
    } catch (error) {
        return res.status(500).send({status:false, message: error.message });
    }
}

module.exports = {memberShipServices}
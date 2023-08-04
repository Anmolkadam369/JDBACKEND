let mongoose = require('mongoose')
let  clientGSTNoModel= require("../../models/clients/clientGSTNoModel");

const  createGSTNo = async (req,res)=>{
    try {
        let GSTNoData = req.body;
        let {GSTNo} = GSTNoData;

    if (!GSTNo)
      return res.status(400).send({ status: false, message: "GSTNo is mandatory" });

    if(typeof(GSTNo) != "string"){
      return res.status(400).send({status: false, message:" please send proper GSTNo"})
    }

    if(GSTNo == "")
      return res.status(400).send({status: false, message:" please send proper GSTNo"});

      const GSTNoCreated = clientGSTNoModel.create(GSTNoData);
      return res.status(200).send({status:true, message:"successfully Added GST", data:GSTNoCreated})

    }
    
    catch (error) {
     return res.status(500).send({ status: false, message: error.message })
    }
}


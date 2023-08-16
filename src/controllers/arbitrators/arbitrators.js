let mongoose = require('mongoose');
const arbitratorsModel = require('../../models/arbitratorsModel');

const arbitratorForm = async (req,res)=>{
    try {
        let data = req.body;
        let {title,fullName,DateOfBirth,Nationality,gender,personalAdd,city,country,phone,telephone,email,alternateAdd,alternateCity,alternateCountry,alternatePhone,alternateTelephone,alternateEmail,communication,Degree,DatesObtained,institutionName,location,knowLanguages,othersInAcadamic,organizationNameInLegal,DateInLegal,positionInLegal,responsibilityInBriefinLegal,organizationNameInNonLegal,DateInNonLegal,positionInNonLegal,responsibilityInBriefInNonLegal,judicialExperience,fieldOfExpertise,othersInExpertise,programTitleInDispute,DateInDispute,institutionNameInDispute,otherReleventInfo,arbitralName,natureOfDispute,sumInDispute,awardRendered,publications,organizationNameInMembership,dateOfAdmission,status,additionalInfo}= data;
       
         if(!title)
        return res.status(400).send({status: false, message: "title is required"});
  
         if (title == "")
        return res.status(400).send({ status: false, message: "Please Enter title value" });
  
         if(typeof(title) != "string")
        return res.status(400).send({status: false, message: "title should be in String"});
      //________________________________________________________________________________________________________

      
      if(!fullName)
      return res.status(400).send({status: false, message: "fullName is required"});

       if (fullName == "")
      return res.status(400).send({ status: false, message: "Please Enter fullName value" });

       if(typeof(fullName) != "string")
      return res.status(400).send({status: false, message: "fullName should be in String"});
    //________________________________________________________________________________________________________

    
    if(!DateOfBirth)
    return res.status(400).send({status: false, message: "DateOfBirth is required"});

     if (DateOfBirth == "")
    return res.status(400).send({ status: false, message: "Please Enter DateOfBirth value" });

     if(typeof(DateOfBirth) != "string")
    return res.status(400).send({status: false, message: "DateOfBirth should be in String"});
  //________________________________________________________________________________________________________
  
  if(!Nationality)
  return res.status(400).send({status: false, message: "Nationality is required"});

   if (Nationality == "")
  return res.status(400).send({ status: false, message: "Please Enter Nationality value" });

   if(typeof(Nationality) != "string")
  return res.status(400).send({status: false, message: "Nationality should be in String"});
//________________________________________________________________________________________________________
      

if(!gender)
return res.status(400).send({status: false, message: "gender is required"});

 if (gender == "")
return res.status(400).send({ status: false, message: "Please Enter gender value" });

 if(typeof(gender) != "string")
return res.status(400).send({status: false, message: "gender should be in String"});
//________________________________________________________________________________________________________
  if(!personalAdd)
  return res.status(400).send({status: false, message: "personalAdd is required"});

   if (personalAdd == "")
  return res.status(400).send({ status: false, message: "Please Enter personalAdd value" });

   if(typeof(personalAdd) != "string")
  return res.status(400).send({status: false, message: "personalAdd should be in String"});
//________________________________________________________________________________________________________
  if(!city)
  return res.status(400).send({status: false, message: "city is required"});

   if (city == "")
  return res.status(400).send({ status: false, message: "Please Enter city value" });

   if(typeof(city) != "string")
  return res.status(400).send({status: false, message: "city should be in String"});
//________________________________________________________________________________________________________
  if(!country)
  return res.status(400).send({status: false, message: "country is required"});

   if (country == "")
  return res.status(400).send({ status: false, message: "Please Enter country value" });

   if(typeof(country) != "string")
  return res.status(400).send({status: false, message: "country should be in String"});
//________________________________________________________________________________________________________
  if(!phone)
  return res.status(400).send({status: false, message: "phone is required"});

   if (phone == "")
  return res.status(400).send({ status: false, message: "Please Enter phone value" });

   if(typeof(phone) != "number")
  return res.status(400).send({status: false, message: "phone should be in number"});
//________________________________________________________________________________________________________
  if(telephone){
   if (telephone == "")
  return res.status(400).send({ status: false, message: "Please Enter telephone value" });

   if(typeof(telephone) != "number")
  return res.status(400).send({status: false, message: "telephone should be in Number"});
}
//________________________________________________________________________________________________________
  if(!email)
  return res.status(400).send({status: false, message: "email is required"});

   if (email == "")
  return res.status(400).send({ status: false, message: "Please Enter email value" });

   if(typeof(email) != "string")
  return res.status(400).send({status: false, message: "email should be in String"});
//________________________________________________________________________________________________________
  if(alternateAdd){
   if (alternateAdd == "")
  return res.status(400).send({ status: false, message: "Please Enter alternateAdd value" });

   if(typeof(alternateAdd) != "string")
  return res.status(400).send({status: false, message: "alternateAdd should be in String"});}
//________________________________________________________________________________________________________
  if(alternateCity){
   if (alternateCity == "")
  return res.status(400).send({ status: false, message: "Please Enter alternateCity value" });

   if(typeof(alternateCity) != "string")
  return res.status(400).send({status: false, message: "alternateCity should be in String"});}
//________________________________________________________________________________________________________
  if(alternateCountry){
   if (alternateCountry == "")
  return res.status(400).send({ status: false, message: "Please Enter alternateCountry value" });

   if(typeof(alternateCountry) != "string")
  return res.status(400).send({status: false, message: "alternateCountry should be in String"});}
//________________________________________________________________________________________________________
  if(alternatePhone){
   if (alternatePhone == "")
  return res.status(400).send({ status: false, message: "Please Enter alternatePhone value" });

   if(typeof(alternatePhone) != "number")
  return res.status(400).send({status: false, message: "alternatePhone should be in number"});}
//________________________________________________________________________________________________________
  if(alternateTelephone){
   if (alternateTelephone == "")
  return res.status(400).send({ status: false, message: "Please Enter alternateTelephone value" });

   if(typeof(alternateTelephone) != "number")
  return res.status(400).send({status: false, message: "alternateTelephone should be in number"});}
//________________________________________________________________________________________________________
  if(alternateEmail){
   if (alternateEmail == "")
  return res.status(400).send({ status: false, message: "Please Enter alternateEmail value" });

   if(typeof(alternateEmail) != "string")
  return res.status(400).send({status: false, message: "alternateEmail should be in String"});}
//________________________________________________________________________________________________________
  if(!communication)
  return res.status(400).send({status: false, message: "communication is required"});

   if (communication == "")
  return res.status(400).send({ status: false, message: "Please Enter communication value" });

   if(typeof(communication) != "string")
  return res.status(400).send({status: false, message: "communication should be in String"});
//________________________________________________________________________________________________________
  
if(!Degree)
return res.status(400).send({status: false, message: "Degree is required"});

 if (Degree == "")
return res.status(400).send({ status: false, message: "Please Enter Degree value" });

 if(typeof(Degree) != "string")
return res.status(400).send({status: false, message: "Degree should be in String"});
//_______________________________________________________________________________________________________________________

  if(!DatesObtained)
  return res.status(400).send({status: false, message: "DatesObtained is required"});

   if (DatesObtained == "")
  return res.status(400).send({ status: false, message: "Please Enter DatesObtained value" });

   if(typeof(DatesObtained) != "string")
  return res.status(400).send({status: false, message: "DatesObtained should be in String"});
//________________________________________________________________________________________________________
  if(!institutionName)
  return res.status(400).send({status: false, message: "institutionName is required"});

   if (institutionName == "")
  return res.status(400).send({ status: false, message: "Please Enter institutionName value" });

   if(typeof(institutionName) != "string")
  return res.status(400).send({status: false, message: "institutionName should be in String"});
//________________________________________________________________________________________________________
  if(!location)
  return res.status(400).send({status: false, message: "location is required"});

   if (location == "")
  return res.status(400).send({ status: false, message: "Please Enter location value" });

   if(typeof(location) != "string")
  return res.status(400).send({status: false, message: "location should be in String"});
//________________________________________________________________________________________________________
  if(!knowLanguages)
  return res.status(400).send({status: false, message: "knowLanguages is required"});

   if (knowLanguages == "")
  return res.status(400).send({ status: false, message: "Please Enter knowLanguages value" });

   if(typeof(knowLanguages) != "object")
  return res.status(400).send({status: false, message: "knowLanguages should be in Object"});
//________________________________________________________________________________________________________
  if(!othersInAcadamic)
  return res.status(400).send({status: false, message: "othersInAcadamic is required"});

   if (othersInAcadamic == "")
  return res.status(400).send({ status: false, message: "Please Enter othersInAcadamic value" });

   if(typeof(othersInAcadamic) != "string")
  return res.status(400).send({status: false, message: "othersInAcadamic should be in String"});
//________________________________________________________________________________________________________

if(!organizationNameInLegal)
return res.status(400).send({status: false, message: "organizationNameInLegal is required"});

 if (organizationNameInLegal == "")
return res.status(400).send({ status: false, message: "Please Enter organizationNameInLegal value" });

 if(typeof(organizationNameInLegal) != "string")
return res.status(400).send({status: false, message: "organizationNameInLegal should be in String"});
//________________________________________________________________________________________________________
if(!DateInLegal)
return res.status(400).send({status: false, message: "DateInLegal is required"});

 if (DateInLegal == "")
return res.status(400).send({ status: false, message: "Please Enter DateInLegal value" });

 if(typeof(DateInLegal) != "string")
return res.status(400).send({status: false, message: "DateInLegal should be in String"});
//________________________________________________________________________________________________________
if(!positionInLegal)
return res.status(400).send({status: false, message: "positionInLegal is required"});

 if (positionInLegal == "")
return res.status(400).send({ status: false, message: "Please Enter positionInLegal value" });

 if(typeof(positionInLegal) != "string")
return res.status(400).send({status: false, message: "positionInLegal should be in String"});
//________________________________________________________________________________________________________
if(!responsibilityInBriefinLegal)
return res.status(400).send({status: false, message: "responsibilityInBriefinLegal is required"});

 if (responsibilityInBriefinLegal == "")
return res.status(400).send({ status: false, message: "Please Enter responsibilityInBriefinLegal value" });

 if(typeof(responsibilityInBriefinLegal) != "string")
return res.status(400).send({status: false, message: "responsibilityInBriefinLegal should be in String"});
//________________________________________________________________________________________________________
if(!organizationNameInNonLegal)
return res.status(400).send({status: false, message: "organizationNameInNonLegal is required"});

 if (organizationNameInNonLegal == "")
return res.status(400).send({ status: false, message: "Please Enter organizationNameInNonLegal value" });

 if(typeof(organizationNameInNonLegal) != "string")
return res.status(400).send({status: false, message: "organizationNameInNonLegal should be in String"});
//________________________________________________________________________________________________________
if(!DateInNonLegal)
return res.status(400).send({status: false, message: "DateInNonLegal is required"});

 if (DateInNonLegal == "")
return res.status(400).send({ status: false, message: "Please Enter DateInNonLegal value" });

 if(typeof(DateInNonLegal) != "string")
return res.status(400).send({status: false, message: "DateInNonLegal should be in String"});
//________________________________________________________________________________________________________
if(!positionInNonLegal)
return res.status(400).send({status: false, message: "positionInNonLegal is required"});

 if (positionInNonLegal == "")
return res.status(400).send({ status: false, message: "Please Enter positionInNonLegal value" });

 if(typeof(positionInNonLegal) != "string")
return res.status(400).send({status: false, message: "positionInNonLegal should be in String"});
//________________________________________________________________________________________________________
if(!positionInNonLegal)
return res.status(400).send({status: false, message: "positionInNonLegal is required"});

 if (positionInNonLegal == "")
return res.status(400).send({ status: false, message: "Please Enter positionInNonLegal value" });

 if(typeof(positionInNonLegal) != "string")
return res.status(400).send({status: false, message: "positionInNonLegal should be in String"});
//_______________________________________________________________________________________________________________________
if(!responsibilityInBriefInNonLegal)
return res.status(400).send({status: false, message: "responsibilityInBriefInNonLegal is required"});

 if (responsibilityInBriefInNonLegal == "")
return res.status(400).send({ status: false, message: "Please Enter responsibilityInBriefInNonLegal value" });

 if(typeof(responsibilityInBriefInNonLegal) != "string")
return res.status(400).send({status: false, message: "responsibilityInBriefInNonLegal should be in String"});
//_______________________________________________________________________________________________________________________

if(!judicialExperience)
return res.status(400).send({status: false, message: "judicialExperience is required"});

 if (judicialExperience == "")
return res.status(400).send({ status: false, message: "Please Enter judicialExperience value" });

 if(typeof(judicialExperience) != "string")
return res.status(400).send({status: false, message: "judicialExperience should be in String"});
//_______________________________________________________________________________________________________________________
if(!fieldOfExpertise)
return res.status(400).send({status: false, message: "fieldOfExpertise is required"});

 if (fieldOfExpertise == "")
return res.status(400).send({ status: false, message: "Please Enter fieldOfExpertise value" });

 if(typeof(fieldOfExpertise) != "string")
return res.status(400).send({status: false, message: "fieldOfExpertise should be in String"});
//_______________________________________________________________________________________________________________________
if(!othersInExpertise)
return res.status(400).send({status: false, message: "othersInExpertise is required"});

 if (othersInExpertise == "")
return res.status(400).send({ status: false, message: "Please Enter othersInExpertise value" });

 if(typeof(othersInExpertise) != "string")
return res.status(400).send({status: false, message: "othersInExpertise should be in String"});
//_______________________________________________________________________________________________________________________
if(!programTitleInDispute)
return res.status(400).send({status: false, message: "programTitleInDispute is required"});

 if (programTitleInDispute == "")
return res.status(400).send({ status: false, message: "Please Enter programTitleInDispute value" });

 if(typeof(programTitleInDispute) != "string")
return res.status(400).send({status: false, message: "programTitleInDispute should be in String"});
//_______________________________________________________________________________________________________________________
if(!DateInDispute)
return res.status(400).send({status: false, message: "DateInDispute is required"});

 if (DateInDispute == "")
return res.status(400).send({ status: false, message: "Please Enter DateInDispute value" });

 if(typeof(DateInDispute) != "string")
return res.status(400).send({status: false, message: "DateInDispute should be in String"});
//_______________________________________________________________________________________________________________________
if(!institutionNameInDispute)
return res.status(400).send({status: false, message: "institutionNameInDispute is required"});

 if (institutionNameInDispute == "")
return res.status(400).send({ status: false, message: "Please Enter institutionNameInDispute value" });

 if(typeof(institutionNameInDispute) != "string")
return res.status(400).send({status: false, message: "institutionNameInDispute should be in String"});
//_______________________________________________________________________________________________________________________
if(otherReleventInfo){
 if (otherReleventInfo == "")
return res.status(400).send({ status: false, message: "Please Enter otherReleventInfo value" });

 if(typeof(otherReleventInfo) != "string")
return res.status(400).send({status: false, message: "otherReleventInfo should be in String"});}
//_______________________________________________________________________________________________________________________
if(!arbitralName)
return res.status(400).send({status: false, message: "arbitralName is required"});

 if (arbitralName == "")
return res.status(400).send({ status: false, message: "Please Enter arbitralName value" });

 if(typeof(arbitralName) != "string")
return res.status(400).send({status: false, message: "arbitralName should be in String"});
//_______________________________________________________________________________________________________________________
if(!natureOfDispute)
return res.status(400).send({status: false, message: "natureOfDispute is required"});

 if (natureOfDispute == "")
return res.status(400).send({ status: false, message: "Please Enter natureOfDispute value" });

 if(typeof(natureOfDispute) != "string")
return res.status(400).send({status: false, message: "natureOfDispute should be in String"});
//_______________________________________________________________________________________________________________________
if(!sumInDispute)
return res.status(400).send({status: false, message: "sumInDispute is required"});

 if (sumInDispute == "")
return res.status(400).send({ status: false, message: "Please Enter sumInDispute value" });

 if(typeof(sumInDispute) != "string")
return res.status(400).send({status: false, message: "sumInDispute should be in String"});
//_______________________________________________________________________________________________________________________
if(!awardRendered)
return res.status(400).send({status: false, message: "awardRendered is required"});

 if (awardRendered == "")
return res.status(400).send({ status: false, message: "Please Enter awardRendered value" });

 if(typeof(awardRendered) != "string")
return res.status(400).send({status: false, message: "awardRendered should be in String"});
//_______________________________________________________________________________________________________________________
if(publications){
 if (publications == "")
return res.status(400).send({ status: false, message: "Please Enter publications value" });

 if(typeof(publications) != "string")
return res.status(400).send({status: false, message: "publications should be in String"});}
//_______________________________________________________________________________________________________________________
if(organizationNameInMembership){
 if (organizationNameInMembership == "")
return res.status(400).send({ status: false, message: "Please Enter organizationNameInMembership value" });

 if(typeof(organizationNameInMembership) != "string")
return res.status(400).send({status: false, message: "organizationNameInMembership should be in String"});}
//_______________________________________________________________________________________________________________________
if(dateOfAdmission){
 if (dateOfAdmission == "")
return res.status(400).send({ status: false, message: "Please Enter dateOfAdmission value" });

 if(typeof(dateOfAdmission) != "string")
return res.status(400).send({status: false, message: "dateOfAdmission should be in String"});}
//_______________________________________________________________________________________________________________________
if(status){
 if (status == "")
return res.status(400).send({ status: false, message: "Please Enter status value" });

 if(typeof(status) != "string")
return res.status(400).send({status: false, message: "status should be in String"});}
//_______________________________________________________________________________________________________________________
if(additionalInfo){
if (additionalInfo == "")
return res.status(400).send({ status: false, message: "Please Enter additionalInfo value" });

 if(typeof(additionalInfo) != "string")
return res.status(400).send({status: false, message: "additionalInfo should be in String"});}
//_______________________________________________________________________________________________________________________

let formCreated = await arbitratorsModel.create(formCreated);
return res.status(201).send({status:true, message:"form crated", data:formCreated})

} catch (error) {
        return res.status(500).send({status:false, error:error.message});        
    }
}


module.exports = {arbitratorForm};
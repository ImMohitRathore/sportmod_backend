const Service = require("../Service/User.service");
const OtpService = require("../Service/Otp.service");

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}



exports.userLogin = async (req, res) => {
  const { username, email, name, DOB, isverify  , password} = req.body;
  let responseData = {};
  if (isverify ==false ) {
    if (!name || !email) {
      responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly",
      };

      return res.send(responseData);
    }
    const data = await Service.User_data_save_before_verify(req.body);
    console.log(data);
    if (data.status) {

     
     
      var now = new Date();
      var next = AddMinutesToDate(now, 5);

      // console.log(next);

    //   return
      data.otpvalue = Math.floor(100000 + Math.random() * 900000);
     
      data.Expire = next;

      const otp = await OtpService.optSend(data);
      return res.send(otp)

    };

    return res.send(data);
  
  }else{
    if (!password || !email || !username || !DOB  ) {
      responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly",
      };
      
      return res.send(responseData);
    }
    const data = await Service.User_full_dataSave(req.body);
    console.log("data" ,data);
    return res.send(data)
  }
};

exports.otpverify = async(req , res)=>{
const {otpvalue , email}  =req.body
let responseData = {}
if (!otpvalue || !email) {
  responseData = {
    data: null,
    status: false,
    message: "Please fill the data properly",
  };

  return res.send(responseData);
}

var now = new Date();
var currentTime  = AddMinutesToDate(now , 1)
let data = {
  otpvalue  ,email , currentTime
}

const otpverifyService =await OtpService.otpverifyService(data) 
console.log(otpverifyService);
res.send(otpverifyService)
}



exports.usernameVerfy = async(req , res)=>{
  if (!req.body.username ) {
    responseData = {
      data: null,
      status: false,
      message: "Please fill the data properly",
    };
  
    return res.send(responseData);
  }
const data = await Service.usernameVerfy(req.body.username)
res.send(data)
}



// *********************send freind  request ***********************
exports.sendFreindRequest = async(req  , res)=>{
const {userid , senderid  ,profile,name }  = req.body
if(!userid || !senderid || !profile ||!name){
  responseData = {
    data: null,
    status: false,
    message: "please fill data properly!!",
  };

  return res.send(responseData);
}
const data = await Service.sendFreindRequest(req)
res.send(data)

}



// ***************request approve or deny 

exports.RequestApprove_or_deny =async (req , res)=>{
 console.log("req "  , req.body);
  // if(!req.body.senderid  || !req.body.status){
  //   responseData = {
  //     data: null,
  //     status: false,
  //     message: "please fill data properly!!",
  //   };
  
  //   return res.send(responseData);
  // }
  const data = await Service.RequestApprove_or_deny(req)
  res.send(data)
  
}



// team join request approve or deny 

exports.TeamJoin_RequestApprove_or_deny =async (req , res)=>{
  console.log("req "  , req.body);
   // if(!req.body.senderid  || !req.body.status){
   //   responseData = {
   //     data: null,
   //     status: false,
   //     message: "please fill data properly!!",
   //   };
   
   //   return res.send(responseData);
   // }
   const data = await Service.TeamJoin_RequestApprove_or_deny(req)
   res.send(data)
   
 }

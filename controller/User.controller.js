const Service = require("../Service/User.service");
const OtpService = require("../Service/Otp.service");
const bcrypt = require('bcrypt');
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

      const otp = await OtpService.otpSave(data);
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


exports.sendotp = async(req , res)=>{
  const {  email ,otpType}  =req.body
  let responseData = {}
  if (!email || !otpType) {
    responseData = {
      data: null,
      status: false,
      message: "Please fill the data properly",
    };
  
    return res.send(responseData);
  }
  const data = await Service.sendOtp(req)
  res.send(data)
  }
exports.otpverify = async(req , res)=>{
const {otpvalue , email}  =req.body;
console.log("ffff" ,otpvalue ,email);
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
exports.UserDataSave = async (req ,res) => {
  // Check if a password is provided in the request
  if (req.body.password) {
    // Hash the password using bcrypt
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Replace the plain text password with the hashed password in the request body
    req.body.password = hashedPassword;
  }

  // Continue with saving the user data to the database and return the result
  const data = await Service.UserDataSave(req);
  res.send(data)
};


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

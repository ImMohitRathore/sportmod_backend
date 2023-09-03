const Otp = require("../Model/otp.model");
const User = require("../Model/User.model");

exports.otpSave = async (data) => {
  let responseData = {};
  try {
    const expirationTime = new Date();
expirationTime.setMinutes(expirationTime.getMinutes() + 10);
    const otp = new Otp({
      userEmail: data.email,
      otpType: data.otpType,
      OtpValue: data.OtpValue,
      OtpExp: data.expData,
      isExp: data.isExp,
      dataStatus: data.dataStatus,
      ExpireTime : expirationTime
    });

    // return false
    const dataSave = await otp.save()
    console.log("otp", dataSave);
    responseData = {
      data: data.OtpValue,
      status: true,
      message: "otp send  sucessfully",
    };
  } catch (e) {
    console.log(e);
    responseData = {
      data: `sonmething is wrong!! ${e}`,
      status: false,
      message: "data not  sucessfully",
    };
  }

  return responseData;
};

exports.otpverifyService = async (req) => {
  let responseData = {};
  const { email, OtpValue, currentTime } = req;

try{

  const data = await Otp.findOne({ userEmail: req.email, OtpValue: req.otpvalue });

  console.log("data",  data);
  if (data) {
    // var ExpireDate = new Date(data.createdAt);
    console.log("dddd" ,currentTime ,data.createdAt);
    if (data.ExpireTime > currentTime) {
      const user = new User({
        email: req.email,
        isverify :true
       
      });
      const response = await user.save()
      if(response){
        responseData = {
          data: response,
          status: true,
          message: "Otp Verify Sucessfully",
        };
      }else {
        responseData = {
          data: null,
          status: false,
          message: "somthing went wrong",
        };
      }

     
    } else {
      responseData = {
        data: null,
        status: false,
        message: "Otp time is Expire please resend Otp ",
      };
    }

    // console.log("DSgf", ExpireDate, currentTime);
  }else
  responseData = {
    data: null,
    status: false,
    message: "otp is inValid ",
  };

}catch(e){
console.log("e------>",e);
responseData = {
  data: e,
  status: false,
  message: "somthing went wrong",
};
}
  return responseData
};

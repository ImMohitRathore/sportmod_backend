const Otp = require("../Model/otp.model");
const User = require("../Model/User.model");

exports.optSend = async (req) => {
  let responseData = {};
  try {
    const otp = new Otp({
      email: req.data.email,
      otpvalue: req.otpvalue,
      Expire: req.Expire,
    });

    console.log("otp", otp);
    const dataSave = await otp.save();
    responseData = {
      data: req.otpvalue,
      status: true,
      message: "otp send  sucessfully",
    };
  } catch (e) {
    // console.log(e);
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
  const { email, otpvalue, currentTime } = req;

try{

  const data = await Otp.findOne({ email: email, otpvalue: otpvalue });
//   console.log("data", data);
  if (data) {
    var ExpireDate = new Date(data.Expire);
    if (ExpireDate > currentTime) {
      const response = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            isverify: true,
          },
        }
      );

      responseData = {
        data: null,
        status: true,
        message: "Otp Verify Sucessfully",
      };
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
}
  return responseData
};

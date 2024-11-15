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
      ExpireTime: expirationTime,
    });

    // return false
    const dataSave = await otp.save();
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

const findLatestOtp = async (email) => {
  return await Otp.findOne(
    { userEmail: email },
    {},
    { sort: { createdAt: -1 } }
  );
};

const verifyOtpExpiry = (otp, currentTime) => otp.ExpireTime > currentTime;

const saveOrUpdateUser = async (email, fname, lname) => {
  return await User.findOneAndUpdate(
    { email },
    { fname, lname, isverify: true },
    { new: true, upsert: true }
  );
};

exports.otpverifyService = async (req) => {
  const { email, OtpValue, currentTime, fname, lname } = req;
  let responseData = {};

  try {
    const latestOtp = await findLatestOtp(email);

    if (!latestOtp) {
      responseData = {
        data: null,
        status: false,
        message: "No OTP found for the given email.",
      };
      return responseData;
    }

    if (latestOtp.OtpValue != OtpValue) {
      responseData = {
        data: null,
        status: false,
        message: "Invalid OTP. Please try again.",
      };
      return responseData;
    }

    if (!verifyOtpExpiry(latestOtp, currentTime)) {
      responseData = {
        data: null,
        status: false,
        message: "OTP has expired. Please request a new OTP.",
      };
      return responseData;
    }

    const user = await saveOrUpdateUser(email, fname, lname);
    if (user) {
      responseData = {
        data: user,
        status: true,
        message: "OTP verified and user data saved successfully.",
      };
    } else {
      responseData = {
        data: null,
        status: false,
        message: "Something went wrong while saving user data.",
      };
    }
  } catch (error) {
    responseData = {
      data: error,
      status: false,
      message: "Something went wrong during OTP verification.",
    };
  }

  return responseData;
};

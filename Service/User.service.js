const User = require("../Model/User.model");
const JoinTeam = require("../Model/joinTeam.modal");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const OtpService = require("./Otp.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.User_data_save_before_verify = async (req) => {
  let responseData = {};
  try {
    const duplicateData = await User.findOne({ email: req.email });
    console.log("ddd", duplicateData);
    if (duplicateData == null) {
      const user = new User({
        name: req.name,
        email: req.email,
      });

      const dataSave = await user.save();

      // console.log("daat->"  ,dataSave);
      responseData = {
        data: dataSave,
        status: true,
        message: "data saved sucessfully",
      };
    } else
      responseData = {
        data: null,
        status: false,
        message: "Email already Exist",
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

exports.User_full_dataSave = async (data) => {
  let responseData = {};
  // return "sf"
  // console.log("Fz");
  const { email, username, password, DOB } = data;
  try {
    const dataSave = await User.findOne({ email: email, isverify: true });
    // console.log("data" , dataSave);
    if (dataSave != null) {
      await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: password,
            username: username,
            DOB: DOB,
            profile: "../src/assets/profile.jpg",
            isOrganizer: false,
          },
        }
      );

      responseData = {
        data: null,
        status: false,
        message: "User account Created sucessfully ",
      };
    } else
      responseData = {
        data: null,
        status: false,
        message: "Email is not find ",
      };
  } catch (e) {
    console.log(e);
  }

  return responseData;
};

exports.usernameVerfy = async (username) => {
  let responseData = {};

  try {
    const usernameCheck = await User.findOne({ username: username });
    console.log(username, usernameCheck);
    if (usernameCheck == null) {
      responseData = {
        data: null,
        status: true,
        message: "username is unique ",
      };
    } else
      responseData = {
        data: null,
        status: false,
        message: "username is already exist ",
      };
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: "username is already exist ",
    };
  }
  return responseData;
};

exports.UserDataSave = async (req) => {
  let responseData = {};

  try {
    const response = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (response) {
      responseData = {
        data: response,
        status: true,
        message: "data save succesfully ",
      };
    } else {
      responseData = {
        data: null,
        status: false,
        message: "something is wrong ",
      };
    }
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: "username is already exist ",
    };
  }

  console.log(responseData);
  return responseData;
};

exports.SaveUserNamenPass = async (req) => {
  let responseData = {};
  console.log("Request Body: ", req.body);

  try {
    let update = { $set: req.body };
    let token = null;

    if (req?.body?.username) {
      token = jwt.sign({ id: req.body._id, email: req.body.email }, SECRET_KEY);
      const tokenObject = { token: token };
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        update = {
          ...update,
          $push: { tokens: tokenObject },
        };
      } else {
        update = {
          ...update,
          tokens: [tokenObject],
        };
      }
    }

    // Find the user and update their tokens array
    const response = await User.findOneAndUpdate(
      { email: req.body.email },
      update,
      { new: true, upsert: true } // Ensure a new document is created if one doesn't exist
    );

    if (response) {
      responseData = {
        data: response,
        token: token, // Include the JWT token in the response if it was generated
        status: true,
        message: "Data saved successfully",
      };
    } else {
      responseData = {
        data: null,
        status: false,
        message: "Something went wrong",
      };
    }
  } catch (e) {
    responseData = {
      data: `Something went wrong: ${e}`,
      status: false,
      message: "Error saving user data and token",
    };
  }

  console.log(responseData);
  return responseData;
};

exports.sendFreindRequest = async (req) => {
  let responseData = {};
  let requestSendAlready = false;

  try {
    const data = await User.findOne({ _id: req.body.userid });
    console.log("rew", data.statstics.freindList);
    // return false
    // const data =

    data.statstics.freindList.forEach((ele) => {
      if (ele.senderid == req.body.senderid) {
        // console.log("ee"  ,ele);
        responseData = {
          data: null,
          status: false,
          message: "freind request already sended ",
        };

        requestSendAlready = true;
      }
    });

    if (!requestSendAlready) {
      const update = await User.findByIdAndUpdate(req.body.userid, {
        $push: {
          "statstics.freindList": {
            senderid: req.body.senderid,
            name: req.body.name,
            profile: req.body.profile,
            status: false,
          },
        },
      });

      responseData = {
        data: update,
        status: false,
        message: "freind request send successfully ",
      };
    }
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: "freind request not  send successfully ",
    };
  }
  return responseData;
};

// *********************approve or deny....................
exports.RequestApprove_or_deny = async (req) => {
  let responseData = {};

  console.log("datttttt", req.params.id);

  try {
    if (req.body.status == true) {
      const update = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          "statstics.freindList.senderid": req.body.senderid,
        },
        {
          $set: {
            "statstics.freindList.$.status": true,
          },
        }
      );

      responseData = {
        data: null,
        status: true,
        message: "User add to your freind list",
      };
    } else {
      const update = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          "statstics.freindList.senderid": req.body.senderid,
        },
        {
          $pull: {
            "statstics.freindList": {
              senderid: req.body.senderid,
            },
          },
        }
      );

      responseData = {
        data: null,
        status: false,
        message: "User remove from your freind request ",
      };
    }
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: null,
    };
  }
  return responseData;
};

// Team Join Admin Request ----------------

exports.Team_join_request = async (adminid, teamid, team_ucode, req) => {
  let responseData = {};

  console.log(req.body);
  try {
    const query = [
      {
        $unwind: "$teamInfo",
      },
      {
        $unwind: "$teamInfo.admin_requests",
      },

      {
        $match: {
          "teamInfo.admin_requests.senderid": req.body.player_id,
          "teamInfo.admin_requests.teamid":
            typeof req.body.team_id == "object"
              ? req.body.team_id
              : ObjectId(req.body.team_id),
        },
      },
    ];
    // const  res= ObjectId(req.body.teamid)
    // console.log("data--->" ,query , typeof(req.body.team_id)  ,typeof(res));
    // return false

    const data = await User.aggregate(query);

    // return

    // console.log("valllllllllllllllllllll" , adminid);
    if (data.length == 0) {
      const update = await User.findOneAndUpdate(adminid, {
        $push: {
          "teamInfo.admin_requests": {
            senderid: req.body.player_id,
            username: req.body.username,
            profile: req.body.profile,
            team_ucode: team_ucode,
            teamid: teamid,
            status: false,
          },
        },
      });

      responseData = {
        data: update,
        status: true,
        message: " team join request send successfully ",
      };
    } else {
      responseData = {
        data: null,
        status: false,
        message: " team join request already  sended  ",
      };
    }
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: null,
    };
  }
  return responseData;
};

// *********************approve or deny....................
exports.TeamJoin_RequestApprove_or_deny = async (req) => {
  let responseData = {};

  try {
    if (req.body.status == true) {
      const update = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          "teamInfo.admin_requests.senderid": req.body.senderid,
        },
        {
          $set: {
            "teamInfo.admin_requests.$.status": true,
          },
        }
      );

      console.log("data---->", update);
      responseData = {
        data: null,
        status: true,
        message: "User add to your Team",
      };
    } else {
      const update = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          "teamInfo.admin_requests.senderid": req.body.senderid,
        },
        {
          $pull: {
            "teamInfo.admin_requests": {
              senderid: req.body.senderid,
            },
          },
        }
      );

      responseData = {
        data: null,
        status: false,
        message: "User remove from your team  request ",
      };
    }
  } catch (e) {
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message: null,
    };
  }
  return responseData;
};

// Otp Send
exports.sendOtp = async function (req, res) {
  try {
    let email = req.body.email;
    // let mobile = req.body.mobile;
    let otpType = req.body.otpType;
    const Ndate = new Date();
    var expData = new Date(Ndate.getTime() + 5 * 60000);
    let OtpValue = Math.floor(100000 + Math.random() * 900000);

    if (email != "" && email != null) {
      let obj = {
        // userMobile: mobile,
        email: email,
        otpType: otpType,
        OtpValue: OtpValue,
        OtpExp: expData,
        isExp: false,
        dataStatus: 1,
      };
      const saveOtp = await OtpService.otpSave(obj);
      console.log("save Otp::", saveOtp);
      // return false

      if (saveOtp) {
        let reData = {
          status: true,
          data: saveOtp,
          message: "otp is generated",
        };

        return reData;
      } else {
        let reData = {
          status: false,
          data: addedData,
          message: "failed to create otp",
        };

        return reData;
      }
    } else {
      console.log("Ndate");
    }
  } catch (e) {
    console.log("catch", e);
    let reData = {
      status: 500,
      data: "",
      message: "server is not responding",
    };

    return reData;
  }
};

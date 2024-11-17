const User = require("../Model/User.model");
const JoinTeam = require("../Model/joinTeam.modal");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");
const OtpService = require("./Otp.service");
const jwt = require("jsonwebtoken");
const { paginate } = require("../helper");
const follwersModel = require("../Model/follwers.model");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.User_data_save_before_verify = async (req) => {
  let responseData = {};
  try {
    const duplicateData = await User.findOne({ email: req.email });
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

function getRandomGender() {
  const genders = ["Male", "Female", "Other"];
  return genders[Math.floor(Math.random() * genders.length)];
}

function getRandomAge() {
  return Math.floor(Math.random() * (60 - 18 + 1)) + 18; // Random age between 18 and 60
}

function getRandomTags() {
  const tags = ["tag1", "tag2", "tag3", "tag4", "tag5"];
  const randomTags = [];
  const numTags = Math.floor(Math.random() * tags.length) + 1; // Ra,șdom number of tags between 1 and tags.length

  for (let i = 0; i < numTags; i++) {
    const randomIndex = Math.floor(Math.random() * tags.length);
    randomTags.push(tags[randomIndex]);
  }

  return [...new Set(randomTags)]; // Ensure no duplicate tags
}

exports.updatePassword = async (body) => {
  const bcrypt = require("bcrypt");

  try {
    // Fetch the current user from the database
    const existingUser = await User.findOne({ email: body.email });

    if (!existingUser) {
      return {
        status: false,
        data: null,
        message: "User not found",
      };
    }

    // Verify the old password
    const isOldPasswordCorrect = await bcrypt.compare(
      body.oldpassword,
      existingUser.password
    );

    if (!isOldPasswordCorrect) {
      return {
        status: false,
        data: null,
        message: "Old password is incorrect",
      };
    }

    // Check if the new password matches the old one
    const isNewPasswordSame = await bcrypt.compare(
      body.newpassword,
      existingUser.password
    );

    if (isNewPasswordSame) {
      return {
        status: false,
        data: null,
        message: "New password cannot be the same as the old password",
      };
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.newpassword, saltRounds);

    // Update the user's password and retrieve the updated document
    existingUser.password = hashedPassword;
    await existingUser.save();

    // Refetch the entire document to include all the latest changes
    const updatedUser = await User.findOne({ email: body.email });

    return {
      status: true,
      data: updatedUser, // Return the entire document
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error in updatePassword service:", error);
    return {
      status: false,
      data: null,
      message: "Failed to update password",
    };
  }
};

exports.addData = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users

    // Update each user with random gender and age
    for (let user of users) {
      user.gender = getRandomGender();
      user.age = getRandomAge();
      user.tags = getRandomTags();
      await user.save(); // Save the updated user
    }

    res.status(200).json({
      message: "User data updated successfully",
      updatedCount: users.length,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "An error occurred while updating user data",
      error: error.message,
    });
  }
};
exports.User_full_dataSave = async (req) => {
  let responseData = {};
  // return "sf"
  const { email, password } = req.body;
  console.log("Fz", req.body);

  try {
    const dataSave = await User.findOne({ email: email });
    if (dataSave) {
      const validPassword = await bcrypt.compareSync(
        password,
        dataSave.password
      );

      if (!validPassword) {
        responseData = {
          data: null,
          status: false,
          message: " invalid password",
        };
      } else {
        delete req.body.password;
        return this.SaveUserNamenPass(req);
        // token = jwt.sign({ id: dataSave._id, email: email }, SECRET_KEY);
        // const tokenObject = { token: token };
        // res.cookie("tk", token, {
        //   httpOnly: true,
        // });
        // return res.status(200).json("login");
      }
    } else {
      responseData = {
        data: null,
        status: false,
        message: " invalid credintial",
      };
      // console.log("invalid email", data);
      // return req.status(401).json("user eror id");
    }
  } catch (e) {
    console.log(e);
  }

  return responseData;
};

exports.usernameVerfy = async (username) => {
  let responseData = {};

  try {
    const usernameCheck = await User.findOne({ username: username });

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
  console.log("fffff", req.body);
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
  try {
    let update = { $set: req.body };
    let token = null;
    // console.log("dssss", req.body);
    if (req?.body?.username || req?.body?.email) {
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

    const response = await User.findOneAndUpdate(
      { email: req.body.email },
      update,
      { new: true, upsert: true }
    );

    if (response) {
      responseData = {
        data: response,
        token: token,
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
    data.statstics.freindList.forEach((ele) => {
      if (ele.senderid == req.body.senderid) {
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

exports.followUser = async (req) => {
  let responseData = {};
  const userIds = req.body.userid;
  const senderId = req.body.senderid;

  try {
    for (const userId of userIds) {
      const existingFollower = await follwersModel.findOne({
        fromUser: senderId,
        toUser: userId,
      });

      if (existingFollower) {
        await follwersModel.deleteOne({ fromUser: senderId, toUser: userId });

        await Promise.all([
          User.findByIdAndUpdate(
            senderId,
            { $inc: { "statstics.followingCount": -1 } },
            { new: true }
          ),
          User.findByIdAndUpdate(
            userId,
            { $inc: { "statstics.followerCount": -1 } },
            { new: true }
          ),
        ]);

        responseData = {
          status: true,
          data: { _id: userId, isFollowing: false },
          message: `Unfollowed user ${userId} successfully`,
        };
      } else {
        await new follwersModel({
          fromUser: senderId,
          toUser: userId,
          createAt: new Date().toISOString(),
        }).save();

        await Promise.all([
          User.findByIdAndUpdate(
            senderId,
            { $inc: { "statstics.followingCount": 1 } },
            { new: true }
          ),
          User.findByIdAndUpdate(
            userId,
            { $inc: { "statstics.followerCount": 1 } },
            { new: true }
          ),
        ]);

        responseData = {
          data: {
            _id: userId,
            isFollowing: true,
          },

          status: true,
          message: `Followed user ${userId} successfully`,
        };
      }
    }

    return responseData;
  } catch (error) {
    console.error("Error updating followers list:", error);
    return {
      data: null,
      status: false,
      message: `Server error: ${error}`,
    };
  }
};

// *********************approve or deny....................
exports.RequestApprove_or_deny = async (req) => {
  let responseData = {};

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

      const user = await User.findOne({ email });

      if (user && user?.password?.length > 0) {
        let reData = {
          status: false,
          data: [],
          message: "An account with this email already exists. Please log in.",
        };
        return reData;
      } else {
        const saveOtp = await OtpService.otpSave(obj);
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

exports.profileData = async function (req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password -tokens");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.json({
      status: true,
      data: user,
      message: "data send SucessFully",
    });
  } catch (error) {
    console.error("Error retrieving user profile data:", error);
    res.status(500).json({
      data: [],
      status: false,
      message: "Error retrieving user profile data",
    });
  }
};
exports.getUsers = async (req, res) => {
  const {
    page,
    limit,
    isShortbyFollowers = false,
    searchTerm = "",
  } = req.query;

  const userId = req.user?._id;

  const pipeline = [
    {
      $match: {
        _id: { $ne: userId },
        $or: [
          { fname: { $regex: searchTerm, $options: "i" } },
          { lname: { $regex: searchTerm, $options: "i" } },
          // Add other fields you want to search by, e.g.:
          // { username: { $regex: searchTerm, $options: 'i' } },
        ],
      },
    },
    {
      $addFields: {
        _idString: { $toString: "$_id" },
      },
    },
    {
      $lookup: {
        from: "followers",
        let: { toUserId: "$_idString", fromUserId: { $toString: userId } },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$toUser", "$$toUserId"] },
                  { $eq: ["$fromUser", "$$fromUserId"] },
                ],
              },
            },
          },
        ],
        as: "followStatus",
      },
    },
    {
      $addFields: {
        isFollowing: { $gt: [{ $size: "$followStatus" }, 0] },
      },
    },
  ];

  if (isShortbyFollowers) {
    pipeline.push({
      $sort: {
        isFollowing: -1,
      },
    });
  }

  try {
    const paginatedUsers = await paginate(User, pipeline, { page, limit });

    res.status(200).json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowerList = async (req, res) => {
  const { page = 1, limit = 10, type = "following" } = req.query;

  const userId = req.user?._id;

  try {
    const pipeline = [];

    if (type === "followers") {
      pipeline.push(
        {
          $match: { toUser: userId.toString() },
        },
        {
          $match: {
            $expr: {
              $eq: [{ $strLenCP: "$fromUser" }, 24],
            },
          },
        },
        {
          $addFields: {
            fromUserObjectId: { $toObjectId: "$fromUser" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "fromUserObjectId",
            foreignField: "_id",
            as: "followerUser",
          },
        },
        {
          $unwind: "$followerUser",
        },
        {
          $lookup: {
            from: "followers",
            let: { followerId: "$fromUserObjectId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$fromUser", userId.toString()] }, // Current user follows the follower
                      { $eq: ["$toUser", "$$followerId"] },
                    ],
                  },
                },
              },
            ],
            as: "mutualFollow",
          },
        },
        {
          $addFields: {
            isMutual: { $gt: [{ $size: "$mutualFollow" }, 0] },
          },
        },
        {
          $project: {
            followerUser: 1,
            isMutual: 1,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$followerUser", { isMutual: "$isMutual" }],
            },
          },
        }
      );
    } else if (type === "following") {
      // Get the list of users the current user is following
      pipeline.push(
        {
          $match: { fromUser: userId.toString() },
        },
        {
          $match: {
            $expr: {
              $eq: [{ $strLenCP: "$toUser" }, 24],
            },
          },
        },
        {
          $addFields: {
            toUserObjectId: { $toObjectId: "$toUser" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "toUserObjectId",
            foreignField: "_id",
            as: "followingUser",
          },
        },
        {
          $unwind: "$followingUser",
        },
        {
          $replaceRoot: { newRoot: "$followingUser" },
        }
      );
    } else {
      return res.status(400).json({
        error: "Invalid type parameter. Must be 'followers' or 'following'.",
      });
    }

    const paginatedUsers = await paginate(follwersModel, pipeline, {
      page,
      limit,
    });

    res.status(200).json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

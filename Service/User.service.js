const User = require("../Model/User.model");

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

exports.sendFreindRequest = async (req) => {
  let responseData = {};
  let requestSendAlready = false;

  try {
    const data = await User.findOne({ _id: req.body.userid });
    console.log("rew" , data.statstics.freindList);
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
          "statstics.freindList" : {
          "senderid": req.body.senderid,
          "name": req.body.name,
          "profile": req.body.profile,
          "status": false,
        }},
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


  try {


 
    if (req.body.status==true) {
      const update = await User.findOneAndUpdate({ "statstics.freindList.senderid": req.body.senderid}, {
        $set: {
          "statstics.freindList.$.status" : true},
      });

      responseData = {
        data: null,
        status: false,
        message: "User add to your freind list",
      };
    }else {
      const update = await User.findOneAndUpdate({"statstics.freindList.senderid": req.body.senderid}, {
        $pull: {
          "statstics.freindList" : {
          "senderid": req.body.senderid,
        }},
      });

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


exports.Team_join_request = async (username , req) => {
  let responseData = {};

// console.log(req.body.username);
  try {

    const query = [
      {
        $unwind:"$teamInfo"
     },
     {
        $unwind:"$teamInfo.admin_requests"
     },
     
     
     {
         
         $match:{
             "teamInfo.admin_requests.username" : req.body.username
             }
         }
    ]
    const data = await User.aggregate(query) 

    
    // console.log("data--->" ,data);
    // return 
    if(data.length==0){
    const update = await User.findOneAndUpdate(username, {
      $push: {
        "teamInfo.admin_requests" : {
        "senderid": req.body.senderid,
        "username": req.body.username,
        "profile": req.body.profile,
        "status": false,
      }},
    });

    responseData = {
      data: update,
      status: false,
      message: " team join request send successfully ",
    };
  
  }else{
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

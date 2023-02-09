const Organizer = require("../Model/Organizer.model");

exports.to_Be_club_member = async(reqbody) => {
  let responseData = {};

  try {
    const organizer = new Organizer({
      user_id: reqbody.user_id,
      isApprove: reqbody.isApprove,
      accountInfo: {
        accountNumder: reqbody.accountInfo.accountNumder,
        IfseCode: reqbody.accountInfo.IfseCode,
        AccountHolderName: reqbody.accountInfo.AccountHolderName,
        BranchName: reqbody.accountInfo.BranchName,
      },
    });

   await organizer
      .save()
      .then((res) => {
        console.log(res);
        responseData = {
          data: res,
          status: true,
          message: "organizer registration sucessfull",
        };
      })
      .catch((e) => {
        // console.log(e);
        responseData = {
          data: null,
          status: false,
          message: `somthing wrong happen !!  ${e}`,
        };

        return responseData
      });
  } catch (e) {
    console.log(e);
  }

  console.log("resss" , responseData);
  return responseData;
};

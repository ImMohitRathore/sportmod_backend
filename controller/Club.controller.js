const clubService = require("../Service/club.service")


exports.to_Be_club_member = async(req, res) => {
  const { accountInfo, isApprove, user_id } = req.body;
//   const isEmpty = Object.values(accountInfo).every((eve)=>{
//     console.log("eve" , eve);
//   });


//   console.log("aa" , isEmpty);

  if (accountInfo != null && !accountInfo.accountNumder ||!accountInfo.IfseCode||!accountInfo.AccountHolderName  || !accountInfo.BranchName  || !user_id ) {

    responseData = {
      data: null,
      status: false,
      message: "Please fill the data properly",
    };

    return res.send(responseData);

  }

  const data = await clubService.to_Be_club_member(req.body)

  console.log("ress- > " ,data);
  res.send(data)



};

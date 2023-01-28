const teamservice = require("../Service/team.service");

exports.createTeam = async (req, res) => {
    console.log(JSON.parse(req.body.data));
    req.body =JSON.parse(req.body.data)
  const {
    teamName,
    teamBio,
    team_ucode,
    createdBy,
    isPrimary,
    game_type,
    NumderOfPlayers,
    groundType,
    team_status,
  } = req.body;
  //   const isEmpty = Object.values(accountInfo).every((eve)=>{
  //     console.log("eve" , eve);
  //   });

  //   console.log("aa" , isEmpty);

  try {
    if (
        !teamName||
        !teamBio||
        !team_ucode||
        !createdBy||
        !isPrimary||
        !game_type||
        !NumderOfPlayers||
        !groundType||
        !team_status
    ) {
      responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly",
      };

      return res.send(responseData);
    }

    const data = await teamservice.createTeam(req);

    console.log("ress- > ", data);
    res.send(data);
  } catch (e) {
    console.log("e::", e);
  }
};



// join Tournament ...........

exports.joinTeam = async (req, res) => {

const { team_id , player_id , username , profile , } = req.body;

try {
  if (
    !team_id || 
    !player_id ||
    !username ||
     !profile 
  ) {
    responseData = {
      data: null,
      status: false,
      message: "Please fill the data properly",
    };

    return res.send(responseData);
  }

  const data = await teamservice.joinTeam(req);

  res.send(data);
} catch (e) {
  console.log("e::", e);
}
};
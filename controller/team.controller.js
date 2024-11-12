const teamservice = require("../Service/team.service");
const { isAllDataCome } = require("../helper");

exports.createTeam = async (req, res) => {
  const { teamName, teamBio, isPrimary, team_status } = req.body;
  try {
    if (!teamName || !teamBio || !team_status) {
      responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly",
      };
      return res.send(responseData);
    }
    const data = await teamservice.createTeam(req);
    res.send(data);
  } catch (e) {
    console.log("e::", e);
  }
};

// join Tournament ...........

exports.joinTeam = async (req, res) => {
  const { team_id, player_id, username, profile } = req.body;

  try {
    if (!team_id || !player_id || !username || !profile) {
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

exports.getTeamDetials = async (req, res) => {
  const { id } = req.params;
  console.log("dddd", id, req.params);

  try {
    if (!isAllDataCome([id], res).status) {
      res.send(isAllDataCome([id], res).data);
    }
    // const data = await teamservice.joinTeam(req);
    console.log("cccc");
    // res.send(data);÷
  } catch (e) {
    console.log("e::", e);
  }
};

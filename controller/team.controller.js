const teamservice = require("../Service/team.service");

exports.createTeam = async (req, res) => {
  console.log("ddd", req.body);
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

    console.log("ress- > ", data);
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

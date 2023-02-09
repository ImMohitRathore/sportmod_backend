var ground = require("../Model/Game.model");

exports.create_game = async function (req, res) {
  try {
    let gameName = req.body.gameName;
    let maxTeam = req.body.maxTeam;
    let minTeam = req.body.minTeam;
    let groundType = req.body.groundType;
    let createAt = req.body.createAt;

    if (gameName == null || gameName == "") {
      let reData = {
        status: 200,
        data: null,
        message: "gameName  is required!",
      };

      return reData;
    } else if (maxTeam == null || maxTeam == "") {
      let reData = {
        status: 200,
        data: null,
        message: "maxTeam  is required!",
      };
      return reData;
    } else if (minTeam == null || minTeam == "") {
      let reData = {
        status: 200,
        data: null,
        message: "minTeam is required!",
      };

      return reData;
    } else if (groundType == null || groundType == "") {
      let reData = {
        status: 200,
        data: null,
        message: "groundType is required!",
      };

      return reData;
    } else if (createAt == null || createAt == "") {
      let reData = {
        status: 200,
        data: null,
        message: "createAt code is required!",
      };

      return reData;
    } else {
      let userData = {
        gameName: req.body.gameName,
        maxTeam: req.body.maxTeam,
        minTeam: req.body.minTeam,
        groundType: req.body.groundType,
        createAt: req.body.createAt,
      };
      console.log(userData);
    }
  } catch (err) {
    console.log("Failed to add games something went wrong!", err);
  }
};

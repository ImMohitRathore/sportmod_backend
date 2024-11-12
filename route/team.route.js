const Router = require("express").Router();
const teamcontroller = require("../controller/team.controller");

const teamService = require("../Service/team.service");
const authenticateJWT = require("../middleWare");
const TeamRoute = "/teams";
Router.post(
  `${TeamRoute}/createTeam`,
  authenticateJWT,
  teamcontroller.createTeam
);
Router.get(
  `${TeamRoute}/getTeamsData`,
  authenticateJWT,
  teamService.getTeamsData
);

Router.get(
  `${TeamRoute}/teamsdetails/:id`,

  teamcontroller.getTeamDetials
);
Router.post(`${TeamRoute}/joinTeam`, teamcontroller.joinTeam);

module.exports = Router;

const Router = require("express").Router();
const teamcontroller = require("../controller/team.controller");

const teamService = require("../Service/team.service");
const authenticateJWT = require("../middleWare");

Router.post(`/createTeam`, authenticateJWT, teamcontroller.createTeam);
Router.get(`/getTeamsData`, authenticateJWT, teamService.getTeamsData);
Router.get(`/teamsdetails/:id`, teamcontroller.getTeamDetials);
Router.post(`/joinTeam`, teamcontroller.joinTeam);

module.exports = Router;

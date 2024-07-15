const Router = require("express").Router();
const teamcontroller = require("../controller/team.controller");
const teamService = require("../Service/team.service");
const authenticateJWT = require("../middleWare");

Router.post("/createTeam", authenticateJWT, teamcontroller.createTeam);
Router.post("/getTeamsData", authenticateJWT, teamService.getTeamsData);
Router.post("/joinTeam", teamcontroller.joinTeam);

module.exports = Router;

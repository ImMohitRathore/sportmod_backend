const Router = require('express').Router();
const teamcontroller = require('../controller/team.controller')




Router.post("/createTeam" ,teamcontroller.createTeam)
Router.post("/joinTeam" ,teamcontroller.joinTeam)



module.exports = Router;
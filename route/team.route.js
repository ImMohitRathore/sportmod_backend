const Router = require('express').Router();
const teamcontroller = require('../controller/team.controller')




Router.post("/createTeam/:adminid" ,teamcontroller.createTeam)
Router.post("/joinTeam" ,teamcontroller.joinTeam)



module.exports = Router;
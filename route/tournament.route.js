const Router = require('express').Router();
const controller =require('../controller/tournament.controller')


Router.post("/create_tournament"  ,controller.tournament_create)
module.exports = Router;
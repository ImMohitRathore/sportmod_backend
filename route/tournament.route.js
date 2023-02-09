const Router = require('express').Router();
const controller =require('../controller/tournament.controller')


Router.post("/create_tournament"  ,controller.tournament_create)
Router.get("/tournamnet_details" , controller.Tournament_Details)
module.exports = Router;
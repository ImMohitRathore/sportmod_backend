const Router = require('express').Router();
const clubController = require('../controller/Club.controller')




Router.put("/to_Be_club_member" ,clubController.to_Be_club_member)

module.exports = Router;
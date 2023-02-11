const Router = require("express").Router();
const controller = require("../controller/game.controller");

Router.post("/create_game", controller.create_game);
module.exports = Router;

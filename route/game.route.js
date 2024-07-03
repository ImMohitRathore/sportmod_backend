const Router = require("express").Router();
const controller = require("../controller/game.controller");
const service = require("../Service/game.service");
const authenticateJWT = require("../middleWare/index");

Router.post("/create_game", controller.create_game);
Router.get("/get_game", service.get_game);
module.exports = Router;

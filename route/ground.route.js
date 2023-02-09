const Router = require("express").Router();
const controller = require("../controller/ground.controller");

Router.post("/create_ground", controller.create_ground);
module.exports = Router;

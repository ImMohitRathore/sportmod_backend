const Router = require("express").Router();
const controller = require("../controller/ground.controller");
const service = require("../Service/ground.service")
Router.post("/create_ground", controller.create_ground);
Router.get("/get_ground", service.get_Ground);
module.exports = Router;

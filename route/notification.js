const Router = require("express").Router();
const service = require("../Service/notification.service");
const authenticateJWT = require("../middleWare");

Router.get("/getnotification/:id", authenticateJWT, service.getNotification);
Router.get("/addnotification", authenticateJWT, service.addNotification);

module.exports = Router;

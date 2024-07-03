const Router = require("express").Router();
const controller = require("../controller/User.controller");
const authenticateJWT = require("../middleWare");
const Service = require("../Service/User.service");

Router.put("/userLogin", controller.userLogin);
Router.put("/userDataSave", controller.UserDataSave);
Router.get("/profile", authenticateJWT, Service.profileData);
Router.get("/getusers", Service.getUsers);
Router.post("/sendOtp", controller.sendotp);
Router.post("/otpverify", controller.otpverify);
Router.put("/usernameVerfy", controller.usernameVerfy);
Router.put("/sendFreindRequiest", controller.sendFreindRequest);
Router.put("/followUser", controller.followUser);
Router.patch("/RequestApprove_or_deny/:id", controller.RequestApprove_or_deny);
Router.patch(
  "/TeamJoin_RequestApprove_or_deny/:id",
  controller.TeamJoin_RequestApprove_or_deny
);

module.exports = Router;

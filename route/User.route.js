const Router = require("express").Router();
const controller = require("../controller/User.controller");
const authenticateJWT = require("../middleWare");
const Service = require("../Service/User.service");

Router.put("/userLogin", controller.userLogin);
Router.put("/userDataSave", controller.UserDataSave);
Router.put("/add", Service.addData);
Router.get("/profile", authenticateJWT, Service.profileData);
Router.get("/UserDetail/:id", authenticateJWT, Service.UserDetail);

Router.get("/getusers", authenticateJWT, Service.getUsers);
Router.get("/getFollowerList", authenticateJWT, Service.getFollowerList);
Router.get(
  "/getFollowerList_other_user/:id",
  authenticateJWT,
  Service.getFollowerListOtherUser
);
Router.post("/sendOtp", controller.sendotp);
Router.post("/otpverify", controller.otpverify);
Router.put("/updatePassword", controller.updatePassword);
Router.put("/usernameVerfy", controller.usernameVerfy);
Router.put(
  "/sendFreindRequiest",
  authenticateJWT,
  controller.sendFreindRequest
);
Router.put("/followUser", authenticateJWT, controller.followUser);
Router.patch("/RequestApprove_or_deny/:id", controller.RequestApprove_or_deny);
Router.patch(
  "/TeamJoin_RequestApprove_or_deny/:id",
  authenticateJWT,
  controller.TeamJoin_RequestApprove_or_deny
);

module.exports = Router;

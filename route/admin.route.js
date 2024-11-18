const Router = require("express").Router();
const controller = require("../controller/admin.controller");
const authenticateJWT = require("../middleWare/index");

Router.post("/create_admin", controller.create_admin); // Create Admin
Router.put("/update_admin/:id", controller.update_admin); // Update Admin
Router.get("/get_admin/:id", controller.get_admin); // Get Admin by ID
Router.get("/get_all_admin", controller.get_all_admin); // Get All Admins
Router.delete("/delete_admin/:id", controller.delete_admin); // Delete Admin
Router.post("/login_admin", controller.login_admin); // Login Admin and save token

module.exports = Router;

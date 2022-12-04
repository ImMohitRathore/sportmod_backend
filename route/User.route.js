const Router = require('express').Router();
const controller = require('../controller/User.controller')




Router.post('/userLogin' ,controller.userLogin )
Router.post('/otpverify' , controller.otpverify)
Router.post('/usernameVerfy' , controller.usernameVerfy)



module.exports = Router;
const Router = require('express').Router();
const controller = require('../controller/User.controller')




Router.post('/userLogin' ,controller.userLogin )
Router.post('/otpverify' , controller.otpverify)
Router.post('/usernameVerfy' , controller.usernameVerfy)
Router.patch('/sendFreindRequiest'  , controller.sendFreindRequest)
Router.patch('/RequestApprove_or_deny'  , controller.RequestApprove_or_deny)



module.exports = Router;
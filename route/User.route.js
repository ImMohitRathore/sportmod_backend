const Router = require('express').Router();
const controller = require('../controller/User.controller')




Router.post('/userLogin' ,controller.userLogin )
Router.post('/otpverify' , controller.otpverify)
Router.post('/usernameVerfy' , controller.usernameVerfy)
Router.patch('/sendFreindRequiest'  , controller.sendFreindRequest)
Router.patch('/RequestApprove_or_deny/:id'  , controller.RequestApprove_or_deny)
Router.patch('/TeamJoin_RequestApprove_or_deny/:id'  , controller.TeamJoin_RequestApprove_or_deny)



module.exports = Router;
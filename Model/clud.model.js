const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
 accountInfo :{
    accountNumder:{},
    IfseCode:{} , 
    AccountHolderName:{} , 
    BranchName:{}

 },

 gameType:{
    required:true
 } ,
 
});

module.exports = mongoose.model("Organizer", UserSchema);

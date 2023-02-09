const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

user_id: {
   type:String,
 unique: true 
},

isApprove :{
type:String
},

 accountInfo :{
    accountNumder:{},
    IfseCode:{} , 
    AccountHolderName:{} , 
    BranchName:{}

 }


 
});

module.exports = mongoose.model("Organizer", UserSchema);

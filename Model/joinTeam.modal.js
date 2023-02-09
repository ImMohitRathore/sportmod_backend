const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
 team_id:{
    type:String
  } , 
 player_id:{
    type:String
  } ,
  admin_id:{
    type:String
  } ,
  team_ucode:{
    type:String
  } ,
  joined_at:{
    type:String //comes from ground modal================//
  },

  status:{},
  createAt: {
    type: String,
  },

  
});

module.exports = mongoose.model("JoinTeam", UserSchema);

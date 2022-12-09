const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  tounament_id:{
    type:String
  } , 
  team_id:{
    type:String
  } ,
  joined_at:{
    type:String //comes from ground modal================//
  },

  createAt: {
    type: String,
  },

  
});

module.exports = mongoose.model("Join_Tounrnament", UserSchema);

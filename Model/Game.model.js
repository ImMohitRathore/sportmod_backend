const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  gameName:{
    type:String
  } , 
  NumderOfPlayers:{
    type:String
  } ,
  groundType:{
    type:String //comes from ground modal================//
  },

  createAt: {
    type: String,
  },

  
});

module.exports = mongoose.model("Game", UserSchema);

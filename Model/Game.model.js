const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  gameName:{} , 
  NumderOfPlayers:{} ,

  createAt: {
    type: String,
  },

  
});

module.exports = mongoose.model("Game", UserSchema);

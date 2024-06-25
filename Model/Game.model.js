const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  gameName: String,

  maxTeam: String,

  minTeam: String,

  gameType: String,
  icon: String,

  createAt: String,
});

module.exports = mongoose.model("Game", GameSchema);

const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  gameName: {
    type: String,
  },

  maxTeam: {
    type: String,
  },

  minTeam: {
    type: String,
  },

  groundType: {
    type: String,
  },

  createAt: {
    type: String,
  },
});

module.exports = mongoose.model("Game", GameSchema);

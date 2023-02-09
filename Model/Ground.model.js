const mongoose = require("mongoose");
const GroundSchema = new mongoose.Schema({
  groundName: {
    type: String,
  },
  Size: {
    type: String,
  },
  Cost: {
    type: String,
  },

  TimingEnd: {
    type: String,
  },

  groundImage: {
    type: String,
  },
});

module.exports = mongoose.model("Ground", GroundSchema);

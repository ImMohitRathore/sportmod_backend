const mongoose = require("mongoose");
const followerSchema = new mongoose.Schema({
  fromUser: {
    type: String,
  },
  toUser: {
    type: String,
  },

  createAt: {
    type: String,
  },
});

module.exports = mongoose.model("Followers", followerSchema);

const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  fromId: {
    type: String,
  },
  type: {
    type: String, //follow, app,  team, tournament, wallet, transaction
  },

  message: {
    type: String,
  },
  // example: follow: has followed you, team: has sent you request to join your team, team: has request you to join his team, app:welcome to conqore app.

  sourceId: {
    type: String,
  },

  userInfo: {},

  seenStatus: {
    type: Boolean,
  },

  countStatus: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Sets the current timestamp as the default value
  },
});

module.exports = mongoose.model("Notifications", notificationSchema);

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  profile : {
    type: String,
  },
  name: {
    type: String,
  },

  phone: {
    type: Number,
  },
  DOB: {
    type: String,
  },

  isverify: {
    type: String,
  },

  statstics: {
    followers: {
      type: Number,
    },
    following: {
      type: Number,
    },
    tournaments: {
      type: Number,
    },
    level: {
      type: Number,
    },
    account_type: {
      type: String,
    },
  },
  createAt: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

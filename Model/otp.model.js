const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  otpType: {
    type: String,
  },
  OtpValue: {
    type: Number,
  },
  OtpExp: {
    type: String,
  },
  isExp: {
    type: Boolean,
  },
  dataStatus: {
    type: String,
  },
  ExpireTime: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Otp", OtpSchema);

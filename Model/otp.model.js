const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
 
  email: {
    type: String,
  },
  otpvalue: {
    type: Number,
  },
  Expire: {
    type: String,
  },
// addCreated date ===============//
  
 
});

module.exports = mongoose.model("Otp", OtpSchema);

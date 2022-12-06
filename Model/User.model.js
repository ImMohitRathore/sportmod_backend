const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique:true
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

  isOrganizer:{
    type: Boolean, //true - false only
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

  userAbout : {

    favGame:{
      type:String //will come from game list==========//
    },
    user_bio:{
      type:String // user bio===============//
     },
    team_id : {
      type:String //this for personal team comes from team modal
     },
     club_id :{
      type:String //if the user is organiser=========//
     }

  },

  userWallet:{
    type:String
  },

  userBank : {

    ifscCode:{
      type:String
    },
    accountNo:{
      type:String
    },
    bankName:{
      type:String
    },
    holderName:{
      type:String
    }

  },
  createAt: {
    type: String,
  },

  updatedAt: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

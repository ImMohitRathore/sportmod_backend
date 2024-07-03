const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  profile: {
    type: String,
  },
  password: {
    type: String,
  },
  fname: {
    type: String,
  },
  lname: {
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
  isOrganizer: {
    type: Boolean, // true - false only
  },

  location: {
    latitude: Number,
    longitude: Number,
  },
  statstics: {
    freindList: [
      {
        senderid: {},
        name: {},
        profile: {},
        status: {
          type: Boolean,
        },
      },
    ],

    followersList: [],
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
  teamInfo: {
    admin_requests: [
      {
        senderid: {},
        teamid: {},
        profile: {},
        username: {},
        team_ucode: {},
        status: {
          type: Boolean,
        },
      },
    ],
  },
  userAbout: {
    favGame: {
      type: String, // will come from game list
    },
    user_bio: {
      type: String, // user bio
    },
    team_id: {
      type: String, // this for personal team comes from team modal
    },
    club_id: {
      type: String, // if the user is organiser
    },
  },
  userWallet: {
    type: String,
  },
  userBank: {
    ifscCode: {
      type: String,
    },
    accountNo: {
      type: String,
    },
    bankName: {
      type: String,
    },
    holderName: {
      type: String,
    },
  },
  createAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  tokens: {
    type: [{ token: String }],
    default: [], // Initialize as an empty array
  },
});
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);

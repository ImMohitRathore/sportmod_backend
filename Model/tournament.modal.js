const mongoose = require("mongoose");
const TournamentSchema = new mongoose.Schema({


  tu_code: {//tournament code for unique purpose extra from id
    type: String,
    unique:true
  },
  title: {
    type: String,
  },
  subtitle : {
    type: String,
  },
  coverImage: {
    type: String,
  },
  multiImages: {
    type: Object,  //this for letter for multi plae images
  },

  description: {
    type: String,
  },
  organised_by: {//add creater ID
    type: String,
  },

  tm_status: {
    type: String, // true false 1= for unpublish 2= publish 3=ended 
  },

  startDate:{
    type: String, //start date for tournament
  },
  endDate:{
    type: String, 
  },

  teamLimit:{
    type: String, 
  },

  tm_details:{
    totalTeams: {
        type: Number,
      },


      totalPlayers: {
        type: Number,
      },
      gameType: {
        type: Number, // game id 
      },
     
      play_venu: {
        type: String,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      ticketPrice: {
        type: String,
      },
      ticketStock: {
        type: String, //last quantity of availble tickets
      },
      qr_code: {
        type: String, // scan and join tournament===================// should be add a image of qr code
      },
      likes:{
        type: String, // this for intractive purpose we need to add a option for like tournament
      },
  },

  price_level: {
    level1:{
     type: String,
    },
    level2:{
     type: String,
    },
    level3:{
     type: String,
    },
    allLevel:{
     type: String,
    }
},

  rules:{
    type: Object, //multiple rules list shoulb submit in array object
  },
  dataStatus:{
    type: String, //1=active and 0=soft deleted
  },

  createAt: {
    type: String,
  },
});

module.exports = mongoose.model("TournamentSchema", TournamentSchema);

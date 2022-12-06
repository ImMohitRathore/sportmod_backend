const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({


  teamName:{
    type:String
  }, 
 
  teamLogo:{
    type:String
  },
  teamBio:{
    type:String
   },
   team_ucode:{
    type:String,
    unique:true
   },
 
   createdBy:{
    type:String
   },
   isPrimary:{
    type:String  //if user want to make it primary team
   },
   game_type:{
    type:String  //from game
   },

  NumderOfPlayers:{
    type:String
  } ,
  groundType:{
    type:String //comes from ground modal================//
  },
  team_status:{
    type:String // 1=active , 0= soft delete 
  },

  createAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },

  
});

module.exports = mongoose.model("Team", TeamSchema);

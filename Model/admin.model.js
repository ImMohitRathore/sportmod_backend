const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
 email:{
    type:String,
    unique:true
  } , 
 name:{
    type:String
  } ,
  password:{
    type:String
  } ,
  role:{
    type:String
  } ,

  

  status:{
    type:Boolean
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
  }
  
});

module.exports = mongoose.model("Admin", AdminSchema);

const User = require("../Model/User.model");

exports.User_data_save_before_verify = async (req) => {
  let responseData = {};
  try {
    const duplicateData = await User.findOne({ email: req.email });
    console.log("ddd" , duplicateData);
    if (duplicateData==null) {
      const user = new User({
        name: req.name,
        email: req.email,
      });

      const dataSave = await user.save();

      // console.log("daat->"  ,dataSave);
      responseData = {
        data: dataSave,
        status: true,
        message: "data saved sucessfully",
      };
    }else

    responseData = {
      data: null,
      status: false,
      message: "Email already Exist",
    };

  } catch (e) {
    console.log(e);
    responseData = {
      data: `sonmething is wrong!! ${e}`,
      status: false,
      message: "data not  sucessfully",
    };
  }

  return responseData;
};


exports.User_full_dataSave  =(async(data)=>{
  let responseData = {}
// return "sf"
// console.log("Fz");
const {email , username , password , DOB} = data
try{
  const dataSave = await User.findOne({email : email , isverify : true})
  // console.log("data" , dataSave);
  if(dataSave !=null){

    await User.findOneAndUpdate({email :email}  ,{
      $set:{
        password :password , 
        username : username ,
        DOB : DOB,
        profile:"../src/assets/profile.jpg",
        isOrganizer : false

      }
    })

    responseData = {
      data: null,
      status: false,
      message: "User account Created sucessfully ",
    };
  }else
  responseData = {
    data: null,
    status: false,
    message: "Email is not find ",
  };

}catch(e){
  console.log(e);
}

return responseData
})


exports.usernameVerfy= (async(username)=>{
  let responseData = {}
  
  try{

    const usernameCheck = await User.findOne({username:username})
    console.log( username, usernameCheck);
  if(usernameCheck == null){
    responseData = {
      data: null,
      status: true,
      message:  "username is unique ",
    };
  }else
    responseData = {
      data: null,
      status: false,
      message:  "username is already exist ",
    };
  }catch(e){
    // console.log("");
    responseData = {
      data: `something is wrong ${e}`,
      status: false,
      message:  "username is already exist ",
    };
  }
  return responseData
})
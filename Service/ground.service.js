var ground = require("../Model/Ground.model");
var cloudinary = require("../cloudnary/imageUploader");
const uploadFromBuffer = require("../cloudnary/imageUploader")
exports.create_ground = async (req, res) => {

  // console.log("cccaaajjjj", file);
  // cloudinary.uploader;

  const {  groundName,  Size,Cost, TimingEnd } = req.body;
console.log("daa" ,req.body );
  let reData = {} ;
  try {
    if (
      !groundName ||  !Size ||!Cost || !TimingEnd 

   
    ) {
      reData = {
        status: 400,
        data: null,
        message: "please  fill the data properly",
      };

 
    } else {

      let imageurl = await uploadFromBuffer.uploadFromBuffer(req);
      console.log("dta1111" , imageurl);
      // return false
    
   
      
        const grounddata = {
          groundName,
          Size,
          Cost,
          TimingEnd,
          groundImage: imageurl[0].url,
        };
          console.log("data---> " ,grounddata);
        const newdata = new ground(grounddata);

        const addedData = await newdata.save();

      
          reData = {
            status: 201,
            data: addedData,
            message: "ground created",
          };

         
          console.log("reData-->", reData);
        
      
    }
    // res.json(reData)
  
  } catch (e) {
    console.log("Server request failed please try again letter!!", e);
  }
  // return   "dsg"
  return reData;
  // });
  // return   reData
  // return reData
};

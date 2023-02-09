var ground = require("../Model/Ground.model");
var cloudinary = require("../cloudnary/imageUploader");

exports.create_ground = async (req, res) => {
  const file = req.files.image;
  // console.log("cccaaajjjj" , file);
  // cloudinary.uploader

  const { groundName, size, cost, timingEnd, groundImage } = req.body;
  let reData = {};
  try {
    if (
      !groundName ||
      !size ||
      // !image ||

      !dataStatus
    ) {
      reData = {
        status: 400,
        data: null,
        message: "please  fill the data properly",
      };

      return reData;
    } else {
      let imageStatus = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "ground" },
        async function (err, resu) {}
      );

      if (imageStatus.url) {
        const grounddata = {
          groundName,
          size,
          cost,
          timingEnd,
          groundImage: imageStatus.url,
        };

        const newdata = new ground(grounddata);

        const addedData = await newdata.save();

        if (addedData) {
          reData = {
            status: 201,
            data: addedData,
            message: "ground created",
          };

          console.log(reData);
          // return   "dsg"
          return reData;
        } else {
          reData = {
            status: 200,
            data: null,
            message: "Unable to add ground!",
          };
          // return   "dsg"
          return reData;
        }
      }
    }
    // console.log("reData-->"  , reData);
    // res.json(reData)
    return reData;
  } catch (e) {
    console.log("Server request failed please try again letter!!", e);
  }
  // return   "dsg"
  return reData;
  // });
  // return   reData
  // return reData
};

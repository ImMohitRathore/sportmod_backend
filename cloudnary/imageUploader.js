var cloudinary = require("../cloudnary/cloudnary");
var streamifier = require("streamifier");
exports.uploadFromBuffer = async (req) => {
  console.log("data", req.files);
  var alldata = req.files;
  const finatdata = [];
  const data1 = alldata.map(async (ele) => {
    const response = new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: "foo",
        },
        (error, result) => {
          if (result) {
            resolve(result);
            //    console.log('dddd',result);
          } else {
            reject(error);
          }
        }
      );

      const data = streamifier
        .createReadStream(ele.buffer)
        .pipe(cld_upload_stream);
    });

    const rowdata = await response;
    // return rowdata
    // console.log("datass" , rowdata.secure_url);
    finatdata.push({ url: rowdata.secure_url, fieldname: ele.fieldname });
  });

  await Promise.all(data1);
  // if(finatdata.length > 1){

  // console.log("datassss->"  ,  finatdata);
  // }

  return finatdata;
};

var cloudinary = require("../cloudnary/cloudnary");
var streamifier = require("streamifier");
var sharp = require("sharp"); // Import sharp

exports.uploadFromBuffer = async (req) => {
  var alldata = req.files;
  const finalData = [];

  const data1 = alldata.map(async (ele) => {
    const compressedBuffer = await sharp(ele.buffer)
      .resize(800, 800, { fit: "inside" }) // Resize to fit within 800x800 pixels
      .jpeg({ quality: 80 }) // Compress to 80% quality (adjust as needed)
      .toBuffer();

    const response = new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: "foo",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(compressedBuffer).pipe(cld_upload_stream);
    });

    const rowdata = await response;
    finalData.push({ url: rowdata.secure_url, fieldname: ele.fieldname });
  });

  await Promise.all(data1);

  return finalData;
};

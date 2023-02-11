const service = require("../Service/ground.service");

exports.create_ground = async function (req, res) {
  try {
    // console.log(JSON.parse(req.body.data));
    req.body =JSON.parse(req.body.data)
    var resData = await service.create_ground(req, res);
    console.log("resData", resData);
    return res.status(200).json({
      status: resData.status,
      data: resData.data,
      message: resData.message,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, data: e, message: "Request Error!" });
  }
};
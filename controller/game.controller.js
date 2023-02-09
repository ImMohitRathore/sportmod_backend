const service = require("../Service/game.service");

exports.create_game = async function (req, res) {
  try {
    // console.log(req.files);
    var resData = await service.create_game(req, res);
    console.log("resData", resData);
    return res.status(200).json({
      status: resData.status,
      data: resData.data,
      message: resData.message,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, data: e, message: "Request Error!" });
  }
};

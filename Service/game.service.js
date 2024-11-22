var Game = require("../Model/Game.model");

exports.create_game = async (req) => {
  console.log("data", req.body);
  let responseData = {};

  try {
    // const isNotUnique = await Game.find({
    //   gameName: req.body.gameName,
    // });
    // console.log(isNotUnique);
    // if (isNotUnique.length) {
    //   return {
    //     data: null,
    //     status: false,
    //     message: "duplicate Tu code!!!",
    //   };
    // }

    // return false
    const game = new Game({
      gameName: req.body.gameName,
      maxTeam: req.body.maxTeam,
      minTeam: req.body.minTeam,
      gameType: req.body.gameType,
      icon: req.body.icon,
      createAt: Date.now(),
    });

    // console.log("otp", otp);
    
    const dataSave = await game.save();
    responseData = {
      data: null,
      status: true,
      message: "game create successfully",
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

exports.get_game = async (req, res) => {
  filterdata = await Game.find({});
  // console.log("ffff", filterdata);
  res.send(filterdata);
};

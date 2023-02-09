const service = require("../Service/game.service");

exports.create_game = async (req, res) => {
  req.body = JSON.parse(req.body.data);
  // console.log("req" , req.body , req.files) ;

  const { gameName, maxTeam, minTeam, gameType, createAt } = req.body;
  if (!gameName || !maxTeam || !minTeam || !gameType || !createAt) {
    responseData = {
      data: null,
      status: false,
      message: `Please fill the data properly 1`,
    };

    return res.send(responseData);
  }
  if (
    !tm_details.gameName ||
    !tm_details.maxTeam ||
    !tm_details.minTeam ||
    !tm_details.gameType ||
    !tm_details.createAt
  ) {
    console.log("check", tm_details);
    responseData = {
      data: null,
      status: false,
      message: "Please fill the data properly 2",
    };

    return res.send(responseData);
  }

  const data = await service.create_game(req);

  res.send(data);
  console.log(data);
};

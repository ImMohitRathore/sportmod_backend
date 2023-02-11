const service = require("../Service/game.service");

exports.create_game = async (req, res) => {
  // req.body = JSON.parse(req.body.data);
  // console.log("req" , req.body , req.files) ;

  const { gameName, maxTeam, minTeam, gameType } = req.body;
  if (!gameName || !maxTeam || !minTeam || !gameType ) {
    console.log(req.body , gameName, maxTeam, minTeam, gameType);
    responseData = {
      data: null,
      status: false,
      message: `Please fill the data properly `,
    };

    return res.send(responseData);
  }
 

  const data = await service.create_game(req);

  res.send(data);
  console.log(data);
};
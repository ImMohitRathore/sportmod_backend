const  tournament_Service = require('../Service/tournament.service')



exports.tournament_create = async (req, res) => {
  req.body =JSON.parse(req.body.data)
  // console.log("req" , req.body , req.files) ;
    
  const {
    tu_code,
    title,
    subtitle,
    coverImage,
    multiImages,
    description,
    organised_by,
    tm_status,
    startDate,
    endDate,
    teamLimit,
    tm_details,
    price_level,
    rules,
    dataStatus,
  } = req.body;
  if (
    (!tu_code||
    !title||
    !subtitle||
   
    !description||
    !organised_by||
    !tm_status||
    !startDate||
    !endDate||
    !teamLimit||
    !price_level||
    !rules||
    !dataStatus||
    !tm_details  )
  ) {

    // console.log("data" , req.body);
    responseData = {
        data: null,
        status: false,
        message: `Please fill the data properly 1`,
      };
  
      return res.send(responseData);
  }

  if (!tm_details.totalTeams  ||!tm_details.totalPlayers ||!tm_details.gameType ||!tm_details.play_venu ||!tm_details.startTime ||!tm_details.endTime||!tm_details.ticketPrice||!tm_details.ticketStock||!tm_details.qr_code||!tm_details.likes ){
    console.log("check" , tm_details );
    responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly 2" ,
      };
  
      return res.send(responseData);
  }


  if (!price_level.level1  ||!price_level.level2 ||!price_level.level3 ||!price_level.allLevel  ){
    console.log("pricelevel data is not come " , price_level);
    responseData = {
        data: null,
        status: false,
        message: "Please fill the data properly 3",
      };
  
      return res.send(responseData);
  }


  const data = await tournament_Service.tournament_create(req)
  console.log("datrttttt," , data);

};

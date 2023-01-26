const uploadFromBuffer = require("../cloudnary/imageUploader")
const TournamentSchema = require('../Model/tournament.modal')

    

 
exports.tournament_create  =async (req)=>{
// console.log("data" ,req.body);

try {
    let imageurl = await uploadFromBuffer.uploadFromBuffer(req);
    // console.log("data" , imageurl);
    let responseData = {};
    const tournamentSchema = new TournamentSchema({
        tu_code: req.body.tu_code,
        title: req.body.title,
        subtitle: req.body.subtitle,
         coverImage: imageurl[0].url,
        //  multiImages: req.body.multiImages,
         description: req.body.description,
         organised_by: req.body.organised_by,
        tm_status: req.body.tm_status,
        startDate: req.body.startDate,
         endDate: req.body.endDate,
         teamLimit: req.body.teamLimit,
         tm_details :  {
          totalTeams: req.body.tm_details.totalTeams,
          totalPlayers: req.body.tm_details.totalPlayers,
          gameType: req.body.tm_details.gameType,
          play_venu: req.body.tm_details.play_venu,
          startTime: req.body.tm_details.startTime,
          endTime: req.body.endTime,
          ticketPrice: req.body.tm_details.ticketPrice,
          ticketStock: req.body.tm_details.ticketStock,
          qr_code: req.body.tm_details.qr_code,
          likes: req.body.tm_details.likes
        },
        price_level:  { level1: req.body.price_level.level1, level2: req.body.price_level.level2, level3: req.body.price_level.level3, allLevel: req.body.price_level.allLevel },
        // rules: req.body.rules,
      dataStatus: req.body.dataStatus
    });

    // console.log("otp", otp);
    const dataSave = await tournamentSchema.save();
    responseData = {
      data: null,
      status: true,
      message: "otp send  sucessfully",
    };
  } catch (e) {
    // console.log(e);
    responseData = {
      data: `sonmething is wrong!! ${e}`,
      status: false,
      message: "data not  sucessfully",
    };
  }
   
  return responseData;
}
const uploadFromBuffer = require("../cloudnary/imageUploader")
const TournamentSchema = require('../Model/tournament.modal')

    

 
exports.tournament_create  =async (req)=>{
// console.log("data" ,req.body);
let responseData = {};

try {

   const isNotUnique =  await TournamentSchema.find({tu_code : req.body.tu_code})
  //  console.log(isNotUnique);
   if(isNotUnique.length){
    return {
      data: null,
      status: false,
      message: "duplicate Tu code!!!",
    }
   } 
    let imageurl = await uploadFromBuffer.uploadFromBuffer(req);
    // console.log("data" , imageurl);
       var coverImage = ''
     var multiImages  = []
    imageurl.forEach((ele)=>{
       if (ele.fieldname == 'multiImages'){
        multiImages.push(ele.url)
       }else{
        coverImage = ele.url
       }
    })

    // return false
    const tournamentSchema = new TournamentSchema({
        tu_code: req.body.tu_code,
        title: req.body.title,
        subtitle: req.body.subtitle,
         coverImage:coverImage,
         multiImages: multiImages,
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
      message: "tournament create successfully",
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

// ************************get tournamnet details *******************
exports.tournament_detailsService = async(req)=>{
  let filterdata = []
  if(req.body){
if(req.body.play_venu != ''){ filterdata= await  TournamentSchema.find({'tm_details.play_venu' : req.body.play_venu })}else
if(req.body.gameType != ''){ filterdata= await  TournamentSchema.find({'tm_details.gameType' : req.body.gameType })}else
if(req.body.tu_code != ''){ filterdata= await  TournamentSchema.find({tu_code : req.body.tu_code})}
// if(req.body.startDate != ''){console.log("datasdgfsd1"); filterdata= await  TournamentSchema.find({startDate : req.body.startDate})}
  }else
filterdata= await  TournamentSchema.find({})
console.log(filterdata.length , req.body);
return filterdata


}

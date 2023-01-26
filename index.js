const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require("./connection/DB")
require('dotenv').config()
var PORT =process.env.PORT  
const multer  = require('multer');
const upload = multer();
app.use(upload.any());
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());
// const bodyParser = require('body-parser')
// ...
app.use(bodyParser.text({ type: '/' }));
app.use(express.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }));
app.use(require('./route/User.route.js'))
app.use(require('./route/club.route'))
app.use(require('./route/tournament.route'))

// console.log("port" , PORT); 

app.listen(PORT, ()=>{
console.log(`backend runnig on ${PORT} `);
})
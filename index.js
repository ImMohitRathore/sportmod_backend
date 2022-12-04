const express = require('express')
const app = express()
require("./connection/DB")
require('dotenv').config()
var PORT =process.env.PORT  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./route/User.route.js'))


// console.log("port" , PORT); 

app.listen(PORT, ()=>{
console.log(`backend runnig on ${PORT} `);
})
const mongoose = require("mongoose");
require('dotenv').config();

// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("mongoDB is connected")
})

db.on("error ",()=>{
    console.log("mongoDB is connection error")
})
db.on("disconnected",()=>{
    console.log("mongoDB is disconnected")
})

module.exports=db;

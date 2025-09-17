const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/person"

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

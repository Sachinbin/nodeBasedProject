const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/person.js");
const MenuItem = require("./models/menuItem.js");
const bodyParser = require('body-parser');
const personRoute = require("./routes/personRoutes.js")
const menuRoute = require("./routes/menuRoutes.js")


app.use(bodyParser.json());



app.listen(3000, () => {
    console.log("the listening port is 3000");
});

app.get("/", (req, res) => {
    res.send("You are safe route , how can i help you");
});

//person route_________
app.use("/person",personRoute)

// menu routes____________
app.use("/menu", menuRoute)


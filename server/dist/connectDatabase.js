"use strict";
//Import the mongoose module
var mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config();
//Set up default mongoose connection
var dbname = process.env.MONGO_DBNAME;
var uname = process.env.DB_USER;
var pw = process.env.DB_PASSWORD;
var mongoDB = "mongodb+srv://" + uname + ":" + pw + "@cluster0.n77op.mongodb.net/" + dbname + "?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected successfully");
});

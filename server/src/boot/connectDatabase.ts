//Import the mongoose module
var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function () {
  //Set up default mongoose connection
  var mongoDB: string = "";

  var dbname: string | undefined;
  if (process.env.NODE_ENV == "test") {
    dbname = "initDB";
    const uname = process.env.DB_TEST_USER;
    const pw = process.env.DB_TEST_PASSWORD;
    mongoDB = `mongodb://${uname}:${pw}@localhost:27017/${dbname}?authSource=admin`;
  } else {
    dbname = process.env.MONGO_DBNAME;
    const uname = process.env.DB_USER;
    const pw = process.env.DB_PASSWORD;
    mongoDB = `mongodb+srv://${uname}:${pw}@cluster0.n77op.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  }

  var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: process.env.NODE_ENV == "test" ? 10000 : 30000,
  };

  //console.log(mongoDB);
  const connected = mongoose.connect(mongoDB, options).catch((err: any) => {
    console.log(err.reason);
    process.exit(1);
  });

  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", function () {
    console.log(`Connected to ${process.env.NODE_ENV} ${dbname} successfully`);
  });
  var clientPromise = connected.then(() => {
    return db.getClient();
  });
  return clientPromise;
};

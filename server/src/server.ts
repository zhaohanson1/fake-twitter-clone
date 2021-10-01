const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

async function init() {
  // Set up environment variables
  require("dotenv").config();
  // Set up database connection
  const db = require("./boot/connectDatabase");
  var clientPromise = db();

  app.use(express.static("../../public"));
  const oneDay = 1000 * 60 * 60 * 24;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    session({
      secret: "bazinga",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        clientPromise: clientPromise,
        collectionName: "sessions",
        ttl: oneDay / 1000,
      }),
      cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: oneDay,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  require("./boot/initPassport")();

  const pageRouter = require("./routes");
  const apiRouter = require("./api/apiRouter");

  const port = process.env.BACKEND_PORT || 3000;

  app.get("/api", (_req: any, res: any): void => {
    res.json({ message: "Hello from server!" });
  });

  app.use("/api", apiRouter);
  app.use("/", pageRouter);

  app.listen(port, () => {
    console.log(`Using ${process.env.NODE_ENV} server`);
    console.log(`Listening on ${port}`);
  });

  return app;
}

var ready = init();

module.exports.ready = ready;
module.exports.server = app;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

// Set up environment variables
require("dotenv").config();
// Set up database connection
const db = require("./boot/connectDatabase");
require("./boot/initPassport")();

const app = express();

app.use(express.static("../../public"));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "bazinga",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const pageRouter = require("./routes");
const apiRouter = require("./api/apiRouter");

const port = process.env.BACKEND_PORT || 3000;

app.get("/api", (_req: any, res: any): void => {
  res.json({ message: "Hello from server!" });
});

app.use("/", pageRouter);
app.use("/api", apiRouter);

async function init() {
  await db();
  app.listen(port, () => {
    console.log(`Using ${process.env.NODE_ENV} server`);
    console.log(`Listening on ${port}`);
  });
  return app;
}



module.exports.ready = init();
module.exports.server = app;
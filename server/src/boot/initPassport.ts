const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { User } from "../models/user";
var authController = require("../controllers/authController");
var userController = require("../controllers/userController");

module.exports = function () {
  passport.use(
    "email-local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username: string, password: string, done: any) => {
        try {
          console.log("awaiting finding user");
          var user: typeof User = await userController.getUser({
            email: username,
          });
          if (!user) {
            return done(null, false, { message: "User cannot be found." });
          }

          var validPassword = await authController.validateUser({
            username: user.username,
            password: password,
          });
          console.log("awaiting password validation");
          if (!validPassword) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (err: any) {
          return done(null, false, { message: err.message });
        }
      }
    )
  );

  passport.use(
    "username-local",
    new LocalStrategy(async (username: string, password: string, done: any) => {
      try {
        var user: typeof User = await userController.getUser({
          username: username,
        });
        if (!user) {
          return done(null, false, { message: "User cannot be found." });
        }

        var validPassword = await authController.validateUser({
          username: username,
          password: password,
        });

        if (!validPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err: any) {
        return done(null, false, { message: err.message });
      }
    })
  );

  passport.serializeUser(function (user: typeof User, done: any) {
    done(null, { id: user._id });
  });

  passport.deserializeUser(function (user: any, done: any) {
    User.findById(user.id, function (err: Error, user: typeof User) {
      done(err, user);
    });
  });
};

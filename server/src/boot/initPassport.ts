const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { findUser, User, validateUser } from "../models/user";

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
          var user: typeof User = await findUser({ email: username });
          if (!user) {
            return done(null, false, { message: "User cannot be found." });
          }

          var validPassword = await validateUser({
            username: user.username,
            password: password,
          });

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
        var user: typeof User = await findUser({ username: username });
        if (!user) {
          return done(null, false, { message: "User cannot be found." });
        }

        var validPassword = await validateUser({
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

  passport.deserializeUser(function (id: any, done: any) {
    User.findById(id, function (err: Error, user: typeof User) {
      done(err, user);
    });
  });
};

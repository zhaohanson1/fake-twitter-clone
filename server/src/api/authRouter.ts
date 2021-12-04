import { Router, Request, Response } from "express";

declare module "express" {
  interface Request {
    user?: any;
  }
}

// eslint-disable-next-line new-cap
export const authRouter = Router({ mergeParams: true });

var passport = require("passport");
import { User } from "../models/user";
var authController = require("../controllers/authController");
var userController = require("../controllers/userController");

/*
  POST /api/auth/signup
  Create user
*/
authRouter.post("/signup", async (req: Request, res: Response) => {
  var args = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  authController
    .signup(args)
    .then((pass: boolean) => {
      if (pass) {
        res.json({ success: true, alert: null, redirectURI: "/login" });
      } else {
        throw new Error("Something went wrong: " + pass);
      }
    })
    .catch((err: any) => {
      res.json({ success: false, alert: err.message, redirectURI: null });
    });
});

/*
  POST /api/auth/login
  Login and authenticate
*/
authRouter.post("/login", async (req: Request, res: Response, next: any) => {
  passport.authenticate(
    "email-local",
    (err: Error, user: typeof User, info: any) => {
      if (err) {
        res.json({
          success: false,
          alert: err.message,
          redirectURI: null,
        });
        return;
      }
      if (!user) {
        res.json({
          success: false,
          alert: info.message,
          redirectURI: null,
        });
      } else {
        req.logIn(user, (err) => {
          if (err) {
            res.json({
              success: false,
              alert: err.message,
              redirectURI: null,
            });
          } else {
            userController.updateLastLogin(user.id);
            res.json({
              success: true,
              error_message: null,
              redirectURI: "/dashboard",
            });
          }
        });
      }
    }
  )(req, res, next);
});

/*
  POST /api/auth/logout
  Logout current user
*/
authRouter.post("/logout", (req: Request, res: Response) => {
  req.logOut();
  res.json({ redirectURI: "/" });
});

/*
  GET /api/auth/user
  get current user if exists
*/
authRouter.get("/user", (req: Request, res: Response) => {
  if (req.user) {
    res.json({
      id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.json({ id: null, name: null, username: null, email: null });
  }
});

module.exports = authRouter;

import { Router, Request, Response } from "express";

// eslint-disable-next-line new-cap
export const authRouter = Router({ mergeParams: true });

var passport = require("passport");
import { User } from "../models/user";
var auth_controller = require("../controllers/auth_controller");

authRouter.post("/signup", async (req: Request, res: Response) => {
  var args = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  var json_response = await auth_controller.signup(args);
  res.json(json_response);
});

authRouter.post("/login", (req: Request, res: Response, next: any) => {
  passport.authenticate("local", (err: Error, user: typeof User, info: any) => {
    
    if (err) {
      res.json({
        success: false,
        alert: err.message,
        redirectURI: "/login",
      });
      return;
    }
    if (!user) {
      res.json({
        success: false,
        alert: info.message,
        redirectURI: null,
      });
      return;
    }

    res.json({ success: true, error_message: null, redirectURI: "/" });
  })(req, res, next);

  /*
  
  
  if (await validateUser(args)) {
    
      give login token???
      store login token in db
        associate this with user
    
    res.json({ success: true });
  } else {
    // error or something
    res.json({ success: false });
  }
  */
});

authRouter.post("logout", (req: Request, res: Response) => {
  req.logout();
  res.json({redirectURI: "/"});
  
});
module.exports = authRouter;

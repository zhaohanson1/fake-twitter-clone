import { Router, Request, Response } from "express";

// eslint-disable-next-line new-cap
export const authRouter = Router({ mergeParams: true });
import { createUser, validateUser, UserArgs } from "../models/user";


authRouter.post("/signup", async (req: Request, res: Response) => {
  var args: UserArgs = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    creationDate: null,
    passwordSalt: null,
    passwordHash: null,
  };

  createUser(args);
  //TODO: catch error and throw to frontend

  res.redirect("http://" + process.env.HOST + ":" + process.env.WEBPACK_PORT);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  var args: UserArgs = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    creationDate: null,
    passwordSalt: null,
    passwordHash: null,
  };

  if (await validateUser(args)) {
    /*
      give login token???
      store login token in db
        associate this with user
    */
    res.json({'okay': true});
  } else {
    // error or something
    res.json({'okay': false});
  }
  
});

module.exports = authRouter;

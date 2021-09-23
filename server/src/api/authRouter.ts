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

  const exitCode: any = await createUser(args);
  
  if (!(exitCode instanceof Boolean)) {
    res.json({ success: false, error_message: exitCode.message });
  } else {
    res.json({ success: true });
  }

  //TODO: catch error and throw to frontend
  /*
    Cases:
      Username / email already in use
      invalid pw (front-end should have validation)
      other??? 
  */
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
  console.log(req.body);
  if (await validateUser(args)) {
    /*
      give login token???
      store login token in db
        associate this with user
    */
    res.json({ success: true });
  } else {
    // error or something
    res.json({ success: false });
  }
});

module.exports = authRouter;

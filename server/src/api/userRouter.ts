import { Router, Request, Response } from "express";
import { updateUser } from "../models/user";
import { statusRouter } from "./statusRouter";


export const userRouter = Router({ mergeParams: true });
var userController = require("../controllers/userController");

/* 
// Get all users
userRouter.get("/", (req: Request, res: Response) => {

});
*/

// Create a user
userRouter.post("/", (req: Request, res: Response) => {
  var args = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  userController
    .createUser(args)
    .then((pass: boolean) => {
      if (pass) res.json({ success: true });
      else res.json({ success: false });
    })
    .catch((err: any) => {
      res.json({ success: false, message: err.message });
    });
});

// Get a user
userRouter.get("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var user = userController.getUser(userId);
  res.json(user);
});

// Update a user
userRouter.post("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var attributes = req.body;
  updateUser({ _id: userId }, attributes);
});

// Delete a user
userRouter.delete("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  userController.deleteUser(userId);
});

userRouter.use("/:userId/status", statusRouter);

module.exports = userRouter;
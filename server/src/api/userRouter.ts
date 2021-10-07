import { Router, Request, Response } from "express";
export const userRouter = Router({ mergeParams: true });
var userController = require("../controllers/userController");

/**
 * GET /api/user
 * get all users
 */
userRouter.get("/", (req: Request, res: Response) => {});

/**
 * POST /api/user/
 * create new user
 */
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

/**
 * GET /api/user/:userid
 * get user by id
 */
userRouter.get("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var user = userController.getUserById(userId);
  res.json(user);
});

/**
 * PUT /api/user/:userid
 * edit user by id
 */
userRouter.post("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var attributes = req.body;
  userController.updateUser({ _id: userId }, attributes);
});

/**
 * DELETE /api/user/:userid
 * delete user by id
 */
userRouter.delete("/:userId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  userController.deleteUserById(userId);
});

module.exports = userRouter;

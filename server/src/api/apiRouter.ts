import { Router, Request, Response } from "express";
var authRouter = require("./authRouter");
var userRouter = require("./userRouter");
var statusRouter = require("./statusRouter");

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/status", statusRouter);

router.get("/*", (_req, res) => {
  res.json({ message: "Invalid request" });
});
module.exports = router;

import { Router, Request, Response } from "express";
var authRouter = require('./authRouter');

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/auth", authRouter);

module.exports = router;

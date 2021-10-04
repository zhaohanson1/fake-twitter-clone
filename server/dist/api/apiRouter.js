"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var authRouter = require("./authRouter");
var userRouter = require("./userRouter");
// eslint-disable-next-line new-cap
exports.router = express_1.Router();
exports.router.use("/auth", authRouter);
exports.router.use("/user", userRouter);
exports.router.get("/*", function (_req, res) {
    res.json({ message: "Invalid request" });
});
module.exports = exports.router;

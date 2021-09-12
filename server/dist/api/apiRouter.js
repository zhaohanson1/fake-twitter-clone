"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var authRouter = require('./authRouter');
// eslint-disable-next-line new-cap
exports.router = express_1.Router();
exports.router.use("/auth", authRouter);
module.exports = exports.router;

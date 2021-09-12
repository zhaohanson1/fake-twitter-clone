"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
// eslint-disable-next-line new-cap
exports.authRouter = express_1.Router({ mergeParams: true });
exports.authRouter.post('/signup', function (req, res) {
    res.redirect("http://localhost:8080");
});
exports.authRouter.post('/login', function (req, res) {
    res.send({ token: 'token123' });
});
module.exports = exports.authRouter;

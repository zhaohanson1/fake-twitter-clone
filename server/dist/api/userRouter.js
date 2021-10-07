"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
exports.userRouter = express_1.Router({ mergeParams: true });
var userController = require("../controllers/userController");
/**
 * GET /api/user
 * get all users
 */
exports.userRouter.get("/", function (req, res) { });
/**
 * POST /api/user/
 * create new user
 */
exports.userRouter.post("/", function (req, res) {
    var args = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    userController
        .createUser(args)
        .then(function (pass) {
        if (pass)
            res.json({ success: true });
        else
            res.json({ success: false });
    })
        .catch(function (err) {
        res.json({ success: false, message: err.message });
    });
});
/**
 * GET /api/user/:userid
 * get user by id
 */
exports.userRouter.get("/:userId", function (req, res) {
    var userId = req.params.userId;
    var user = userController.getUserById(userId);
    res.json(user);
});
/**
 * PUT /api/user/:userid
 * edit user by id
 */
exports.userRouter.post("/:userId", function (req, res) {
    var userId = req.params.userId;
    var attributes = req.body;
    userController.updateUser({ _id: userId }, attributes);
});
/**
 * DELETE /api/user/:userid
 * delete user by id
 */
exports.userRouter.delete("/:userId", function (req, res) {
    var userId = req.params.userId;
    userController.deleteUserById(userId);
});
module.exports = exports.userRouter;

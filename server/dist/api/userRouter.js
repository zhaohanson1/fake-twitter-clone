"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var statusRouter_1 = require("./statusRouter");
exports.userRouter = express_1.Router({ mergeParams: true });
var userController = require("../controllers/userController");
/*
// Get all users
userRouter.get("/", (req: Request, res: Response) => {

});
*/
// Create a user
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
// Get a user
exports.userRouter.get("/:userId", function (req, res) {
    var userId = req.params.userId;
    var user = userController.getUserById(userId);
    res.json(user);
});
// Update a user
exports.userRouter.post("/:userId", function (req, res) {
    var userId = req.params.userId;
    var attributes = req.body;
    userController.updateUser({ _id: userId }, attributes);
});
// Delete a user
exports.userRouter.delete("/:userId", function (req, res) {
    var userId = req.params.userId;
    userController.deleteUserById(userId);
});
exports.userRouter.use("/:userId/status", statusRouter_1.statusRouter);
module.exports = exports.userRouter;

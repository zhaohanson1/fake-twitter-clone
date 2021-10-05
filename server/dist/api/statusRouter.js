"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
var express_1 = require("express");
exports.statusRouter = express_1.Router({ mergeParams: true });
var statusController = require("../controllers/statusController");
var userController = require("../controllers/userController");
/**
 *  /api/:userId
 * Get all posts of user
 */
exports.statusRouter.get("/", function (req, res) {
    var userId = req.params.userId;
    var posts = statusController.getAllStatuses(userId);
});
/**
 * /api/:userId/
 * Add a post or comment
 */
exports.statusRouter.post("/", function (req, res) {
    var userId = req.params.userId;
    var content = req.body.content;
    if ("parentId" in req.body) {
        var parentId = req.body.parentId;
        var post = statusController.addComment(userId, parentId, content);
        userController.addStatusToUser(userId, post.id);
    }
    else {
        var post = statusController.addStatus(userId, content);
        userController.addStatusToUser(userId, post.id);
    }
});
// Get a post by postId
exports.statusRouter.get("/:postId", function (req, res) {
    var postId = req.params.postId;
    statusController
        .getStatus(postId)
        .then(function (status) {
        if (!status) {
            res.json({ success: false, content: null });
        }
        else {
            res.json({ sucess: true, content: status.content });
        }
    })
        .catch(function (err) {
        if (err) {
            res.json({ success: false, content: null });
        }
    });
});
// edit a post
exports.statusRouter.put("/:postId", function (req, res) {
    var postId = req.params.postId;
    var content = req.body.content;
    statusController.editStatus(postId, content);
});
// delete a post
exports.statusRouter.delete("/:postId", function (req, res) {
    var userId = req.params.userId;
    var postId = req.params.postId;
    var status = statusController.getStatus(postId);
    if (status.parent === null) {
        statusController.removeStatus(postId);
        userController.removeStatusFromUser(postId);
    }
    else {
        statusController.removeComment(postId);
        userController.removeStatusFromUser(postId);
    }
});
// Add a like to a post
exports.statusRouter.post("/:postId/like", function (req, res) {
    var postId = req.params.postId;
    var postUserId = req.params.userId;
    var likeUserId = req.params.user;
    statusController.addLike(postUserId, postId, likeUserId, function (err, status) {
        if (err) {
            res.json({ success: false });
        }
        if (!status) {
            res.json({ success: false });
        }
        else {
            res.json({ sucess: true });
        }
    });
});
exports.statusRouter.post("/:postId/unlike", function (req, res) {
    var postId = req.params.postId;
    var postUserId = req.params.userId;
    var likeUserId = req.params.user;
    statusController.removeLike(postUserId, postId, likeUserId, function (err, status) {
        if (err) {
            res.json({ success: false });
        }
        if (!status) {
            res.json({ success: false });
        }
        else {
            res.json({ sucess: true });
        }
    });
});
module.exports = { statusRouter: exports.statusRouter };

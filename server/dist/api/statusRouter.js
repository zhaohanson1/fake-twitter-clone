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
    var posts = statusController.getAllPostsFromUser(userId);
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
        userController.addPostToUser(userId, post.id);
    }
    else {
        var post = statusController.addPost(userId, content);
        userController.addPostToUser(userId, post.id);
    }
});
// Get a post by postId
exports.statusRouter.get("/:postId", function (req, res) {
    var postId = req.params.postId;
    statusController.getPost(postId, function (err, status) {
        if (err) {
            res.json({ success: false, content: null });
        }
        if (!status) {
            res.json({ success: false, content: null });
        }
        else {
            res.json({ sucess: true, content: status.content });
        }
    });
});
// edit a post
exports.statusRouter.put("/:postId", function (req, res) {
    var postId = req.params.postId;
    var content = req.body.content;
    statusController.editPost(postId, content);
});
// delete a post
exports.statusRouter.delete("/:postId", function (req, res) {
    var userId = req.params.userId;
    var postId = req.params.postId;
    statusController.removeComment(postId, function (err, status) {
        if (err) {
            res.json({ success: false });
        }
        if (!status) {
            res.json({ success: false });
        }
        else {
            userController.removePostFromUser(userId, postId, function (_err, _user) {
                res.json({ sucess: true });
            });
        }
    });
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

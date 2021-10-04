"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("../models/status");
var userController = require("../controllers/userController");
module.exports = {
    getAllPostsFromUser: function (userId) {
        var posts = status_1.readStatus({
            user: userId,
        });
        return posts;
    },
    addPost: function (userId, content) {
        return status_1.createStatus({
            user: userId,
            content: content,
        })
            .then(function (status) { return status.id; })
            .then(function (postId) {
            userController.addPostToUser(userId, postId);
        })
            .catch(function (err) {
            throw err;
        });
    },
    getPost: function (postId, callback) {
        return status_1.Status.findById(postId, callback);
    },
    editPost: function (postId, content) {
        return status_1.updateStatus({ _id: postId }, { content: content });
    },
    removePost: function (postId, callback) {
        return status_1.Status.findByIdAndDelete(postId, callback);
    },
    getComments: function (postId) {
        var comments = status_1.readStatus({ _id: postId }).comments;
        return comments;
    },
    addComment: function (userId, parentId, content) {
        return status_1.createStatus({
            user: userId,
            parentId: parentId,
            content: content,
        })
            .then(function (status) { return status.id; })
            .then(function (postId) {
            userController.addPostToUser(userId, postId);
        })
            .catch(function (err) {
            throw err;
        });
    },
    removeComment: function (postId, callback) {
        return module.exports.deletePost(postId, callback);
    },
    addLike: function (_userId, postId, likeUserId, callback) {
        status_1.Status.findByIdAndUpdate(postId, { $addToSet: { likes: { _id: likeUserId } } }, callback);
    },
    removeLike: function (_userId, postId, likeUserId, callback) {
        status_1.Status.findByIdAndUpdate(postId, { $pull: { likes: { _id: likeUserId } } }, callback);
    },
};

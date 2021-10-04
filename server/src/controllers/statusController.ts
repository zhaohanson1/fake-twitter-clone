import {
  createStatus,
  readStatus,
  Status,
  updateStatus,
} from "../models/status";

var userController = require("../controllers/userController");

module.exports = {
  getAllPostsFromUser: (userId: string) => {
    var posts = readStatus({
      user: userId,
    });
    return posts;
  },

  addPost: (userId: string, content: string) => {
    return createStatus({
      user: userId,
      content: content,
    })
      .then((status: typeof Status) => status.id)
      .then((postId: string) => {
        userController.addPostToUser(userId, postId);
      })
      .catch((err: any) => {
        throw err;
      });
  },

  getPost: (postId: string, callback: any) => {
    return Status.findById(postId, callback);
  },

  editPost: (postId: string, content: string) => {
    return updateStatus({ _id: postId }, { content: content });
  },

  removePost: (postId: string, callback: any) => {
    return Status.findByIdAndDelete(postId, callback);
  },

  getComments: (postId: string) => {
    var comments = readStatus({ _id: postId }).comments;
    return comments;
  },

  addComment: (userId: string, parentId: string, content: string) => {
    return createStatus({
      user: userId,
      parentId: parentId,
      content: content,
    })
      .then((status: typeof Status) => status.id)
      .then((postId: string) => {
        userController.addPostToUser(userId, postId);
      })
      .catch((err: any) => {
        throw err;
      });
  },

  removeComment: (postId: string, callback: any) => {
    return module.exports.deletePost(postId, callback);
  },

  addLike: (
    _userId: string,
    postId: string,
    likeUserId: string,
    callback: any
  ) => {
    Status.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: { _id: likeUserId } } },
      callback
    );
  },

  removeLike: (
    _userId: string,
    postId: string,
    likeUserId: string,
    callback: any
  ) => {
    Status.findByIdAndUpdate(
      postId,
      { $pull: { likes: { _id: likeUserId } } },
      callback
    );
  },
};

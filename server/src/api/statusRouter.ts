import { Router, Request, Response } from "express";
import { Status } from "../models/status";
import { User } from "../models/user";

export const statusRouter = Router({ mergeParams: true });

var statusController = require("../controllers/statusController");
var userController = require("../controllers/userController");

/**
 *  /api/:userId
 * Get all posts of user
 */
statusRouter.get("/", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var posts = statusController.getAllPostsFromUser(userId);
});

/**
 * /api/:userId/
 * Add a post or comment
 */
statusRouter.post("/", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var content = req.body.content;
  if ("parentId" in req.body) {
    var parentId = req.body.parentId;
    var post = statusController.addComment(userId, parentId, content);
    userController.addPostToUser(userId, post.id);
  } else {
    var post = statusController.addPost(userId, content);
    userController.addPostToUser(userId, post.id);
  }
});

// Get a post by postId
statusRouter.get("/:postId", (req: Request, res: Response) => {
  var postId = req.params.postId;
  statusController.getPost(postId, (err: any, status: typeof Status) => {
    if (err) {
      res.json({ success: false, content: null });
    }
    if (!status) {
      res.json({ success: false, content: null });
    } else {
      res.json({ sucess: true, content: status.content });
    }
  });
});

// edit a post
statusRouter.put("/:postId", (req: Request, res: Response) => {
  var postId = req.params.postId;
  var content = req.body.content;
  statusController.editPost(postId, content);
});

// delete a post
statusRouter.delete("/:postId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var postId = req.params.postId;
  statusController.removeComment(postId, (err: any, status: typeof Status) => {
    if (err) {
      res.json({ success: false });
    }
    if (!status) {
      res.json({ success: false });
    } else {
      userController.removePostFromUser(
        userId,
        postId,
        (_err: any, _user: typeof User) => {
          res.json({ sucess: true });
        }
      );
    }
  });
});

// Add a like to a post
statusRouter.post("/:postId/like", (req: Request, res: Response) => {
  var postId = req.params.postId;
  var postUserId = req.params.userId;
  var likeUserId = req.params.user;

  statusController.addLike(
    postUserId,
    postId,
    likeUserId,
    (err: any, status: typeof Status) => {
      if (err) {
        res.json({ success: false });
      }
      if (!status) {
        res.json({ success: false });
      } else {
        res.json({ sucess: true });
      }
    }
  );
});

statusRouter.post("/:postId/unlike", (req: Request, res: Response) => {
  var postId = req.params.postId;
  var postUserId = req.params.userId;
  var likeUserId = req.params.user;
  statusController.removeLike(
    postUserId,
    postId,
    likeUserId,
    (err: any, status: typeof Status) => {
      if (err) {
        res.json({ success: false });
      }
      if (!status) {
        res.json({ success: false });
      } else {
        res.json({ sucess: true });
      }
    }
  );
});

module.exports = { statusRouter: statusRouter };

import { Router, Request, Response } from "express";
import { Status } from "../models/status";
import { User } from "../models/user";

export const statusRouter = Router({ mergeParams: true });

var statusController = require("../controllers/statusController");
var userController = require("../controllers/userController");

/**
 *  /api/user/:userId/status
 * Get all posts of user
 */
statusRouter.get("/", async (req: Request, res: Response) => {
  var userId = req.params.userId;
  var posts = await statusController.getAllStatuses(userId);
  res.json(posts);
});

/**
 * /api/user/:userId/status
 * Add a post or comment
 */
statusRouter.post("/", async (req: Request, res: Response) => {
  var userId = req.params.userId;
  var content = req.body.content;
  if ("parentId" in req.body) {
    var parentId = req.body.parentId;
    var post = await statusController.addComment(userId, parentId, content);
    await userController.addStatusToUser(userId, post.id);
    res.json({success: true});
  } else {
    var post = await statusController.addStatus(userId, content);
    await userController.addStatusToUser(userId, post.id);
    res.json({success: true});
  }

  
});

/** 
 * /api/user/:userId/status/:postId
 * Get post by id
*/
statusRouter.get("/:postId", (req: Request, res: Response) => {
  var postId = req.params.postId;

  statusController
    .getStatus(postId)
    .then((status: typeof Status) => {
      if (!status) {
        res.json({ success: false, content: null });
      } else {
        res.json({ sucess: true, content: status.content });
      }
    })
    .catch((err: any) => {
      if (err) {
        res.json({ success: false, content: null });
      }
    });
});

/** 
 * /api/user/:userId/status/:postId
 * edit post by id
*/
statusRouter.put("/:postId", (req: Request, res: Response) => {
  var postId = req.params.postId;
  var content = req.body.content;
  statusController.editStatus(postId, content);
});

/** 
 * /api/user/:userId/status/:postId
 * delete post by id
*/
statusRouter.delete("/:postId", (req: Request, res: Response) => {
  var userId = req.params.userId;
  var postId = req.params.postId;
  var status = statusController.getStatus(postId);
  if (status.parent === null) {
    statusController.removeStatus(postId);
    userController.removeStatusFromUser(postId);
  } else {
    statusController.removeComment(postId);
    userController.removeStatusFromUser(postId);
  }
});

/** 
 * /api/user/:userId/status/:postId/like
 * 
*/
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


/** 
 * /api/user/:userId/status/:postId/unlike
 * 
*/
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

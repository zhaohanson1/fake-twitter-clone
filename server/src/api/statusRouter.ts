import { Router, Request, Response } from "express";
import { Status } from "../models/status";
import { User } from "../models/user";

export const statusRouter = Router({ mergeParams: true });

var statusController = require("../controllers/statusController");
var userController = require("../controllers/userController");

/**
 *  GET /api/status/
 * Get all statuses
 */
statusRouter.get("/", async (req: Request, res: Response) => {
  var posts = await statusController.getAllStatuses();
  //var posts = await statusController.getAllStatusesSimple();
  res.json(posts);
});

/**
 * POST /api/status/
 * Add a post or comment
 */
statusRouter.post("/", async (req: Request, res: Response) => {
  var userId = req.body.userId;
  var content = req.body.content;
  if ("parentId" in req.body) {
    var parentId = req.body.parentId;
    var post = await statusController.addComment(userId, parentId, content);
    await userController.addStatusToUser(userId, post.id);
    res.json({ success: true });
  } else {
    var post = await statusController.addStatus(userId, content);
    await userController.addStatusToUser(userId, post.id);
    res.json({ success: true });
  }
});

/**
 * GET /api/status/:statusId
 * Get post by id
 */
statusRouter.get("/:statusId", (req: Request, res: Response) => {
  var statusId = req.params.statusId;

  statusController
    .getStatus(statusId)
    .then((status: typeof Status) => {
      if (!status) {
        res.json({ success: false, status: null, error: "No status found" });
      } else {
        res.json({ success: true, status: status });
      }
    })
    .catch((err: any) => {
      if (err) {
        res.json({ success: false, status: null, error: err.message });
      }
    });
});

/**
 * PUT /api/status/:statusId
 * edit post by id
 */
statusRouter.put("/:statusId", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var content = req.body.content;
  statusController
    .editStatus(statusId, content)
    .then((status: typeof Status) => {
      res.json({ success: true });
    })
    .catch((err: any) => {
      console.error(err);
      res.json({ success: false });
    });
});

/**
 * /api/status/:statusId
 * delete post by id
 */
statusRouter.delete("/:statusId", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var status = statusController.getStatus(statusId);
  try {
    if (status.parent === null) {
      statusController.removeStatus(statusId);
      userController.removeStatusFromUser(statusId);
    } else {
      statusController.removeComment(statusId);
      userController.removeStatusFromUser(statusId);
    }
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.json({ success: false });
  }
});

/**
 * PUT /api/status/:statusId/like
 *
 */
statusRouter.post("/:statusId/like", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var likeUserId = req.params.user;

  statusController.addLike(
    statusId,
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
 * PUT /api/status/:statusId/unlike
 *
 */
statusRouter.post("/:statusId/unlike", (req: Request, res: Response) => {
  var postId = req.params.statusId;
  var likeUserId = req.params.user;
  statusController.removeLike(
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

/* FUTURE TODO?
statusRouter.get("/:statusId/likedBy", (req: Request, res: Response) => {
  try {
    var postId = req.params.statusId;
    var likeUserId = req.params.user;
    var liked = statusController.checkIfLikedByUser(postId, likeUserId);
    res.json({ success: true, liked: liked });
  } catch (err: any) {
    console.error(err);
    res.json({ success: false, liked: null });
  }
});
*/

module.exports = statusRouter;

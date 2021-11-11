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
 * edit post by id, then return success code and new status
 */
statusRouter.put("/:statusId", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var content = req.body.content;
  statusController
    .editStatus(statusId, content)
    .then((status: typeof Status) => {
      res.json({ success: true, status: status });
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
 * PATCH /api/status/:statusId/like
 *
 */
statusRouter.patch("/:statusId/like", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var userId = req.body.user;
  if (!userId) {
    res.json({ success: false });
    return;
  }
  statusController
    .getStatusLikedByUser(statusId, userId)
    .then((liked: boolean) => {
      if (liked) {
        throw new Error("Already liked");
      }
    })
    .then(() => {
      return statusController.addLike(statusId, userId);
    })
    .then((status: typeof Status) => {
      if (status) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err: any) => {
      console.error(err);
      res.json({ success: false });
    });
});

/**
 * PATCH /api/status/:statusId/unlike
 *
 */
statusRouter.patch("/:statusId/unlike", (req: Request, res: Response) => {
  var statusId = req.params.statusId;
  var userId = req.body.user;
  if (!userId) {
    res.json({ success: false });
    return;
  }

  statusController
    .getStatusLikedByUser(statusId, userId)
    .then((liked: boolean) => {
      if (!liked) {
        throw new Error("Already not liked");
      }
    })
    .then(() => {
      return statusController.removeLike(statusId, userId);
    })
    .then((status: typeof Status) => {
      if (status) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err: any) => {
      console.error(err);
      res.json({ success: false });
    });
});

/**
 * GET /api/status/:statusId/likedBy/:userId
 */
statusRouter.get(
  "/:statusId/likedBy/:userId",
  (req: Request, res: Response) => {
    var statusId = req.params.statusId;
    var userId = req.params.userId;
    statusController
      .getStatusLikedByUser(statusId, userId)
      .then((liked: boolean) => {
        console.log(liked);
        res.json({ success: true, liked: liked });
      })
      .catch((err: any) => {
        console.error(err);
        res.json({ success: false, liked: null });
      });
  }
);

module.exports = statusRouter;

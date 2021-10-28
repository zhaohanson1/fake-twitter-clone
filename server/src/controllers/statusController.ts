import { Status } from "../models/status";
var ObjectId = require("mongoose").Types.ObjectId;

var userController = require("../controllers/userController");

export function createStatus(args: object) {
  var status = new Status(args);
  status.creationDate = new Date();
  return status
    .save()
    .then((status: typeof Status) => status)
    .catch((err: any) => {
      if (err) throw err;
    });
}

export function readStatus(args: object) {
  return Status.find(args).exec();
}

export async function updateStatus(
  filter: object,
  doc: object,
  new_doc?: boolean
) {
  return await Status.findOneAndUpdate(filter, doc, { new: new_doc }).exec();
}

var addCommentToStatus = async (statusId: string, commentId: string) => {
  return Status.findByIdAndUpdate(statusId, {
    $addToSet: { comments: { _id: commentId } },
    //$inc: { numberOfComments: 1 },
  }).exec();
};

module.exports = {
  /* CREATE */
  createStatus: createStatus,

  /**
   * Add a status from user
   * @param userId
   * @param content
   * @returns Boolean: true if sucess
   */
  addStatus: (userId: string, content: string) => {
    console.log(userId);
    return createStatus({
      user: userId,
      content: content,
    })
      .then((status: typeof Status) => {
        userController.addStatusToUser(userId, status.id);
        return status;
      })
      .catch((err: any) => {
        throw err;
      });
  },

  /**
   * Add a comment to a status. returns the comment if successful
   * @param userId {String}: the current user's id
   * @param parentId {String}: the id of the parent post
   * @param content {String} The comment's content
   * @returns
   */
  addComment: (userId: string, parentId: string, content: string) => {
    return createStatus({
      user: userId,
      parentId: parentId,
      content: content,
    })
      .then(async (comment: typeof Status) => {
        await addCommentToStatus(parentId, comment.id);
        await userController.addStatusToUser(userId, comment.id);
        return comment;
      })
      .catch((err: any) => {
        // rollback
        throw err;
      });
  },

  /* READ */

  readStatus: readStatus,

  /**
   * Get all statuses from all users from latest to earliest(excluding deleted)
   * @returns
   */
  getAllStatuses: () => {
    return Status.find({ deleted: false })
      .sort({ creationDate: "desc" })
      .exec();
  },

  /* FUTURE TODO
  getAllStatusesSimple: () => {
    return Status.find({ deleted: false })
      .select({ comments: 0, likes: 0 })
      .sort({ creationDate: "desc" })
      .exec();
  },
  */

  /**
   * Get all non-deleted statuses of a user
   * @param userId
   * @returns
   */
  getStatusesOfUser: (userId: string) => {
    var statuses = readStatus({
      user: userId,
      deleted: false,
    });
    return statuses;
  },

  /**
   * Get a status by id
   * @param statusId
   * @returns Status
   */
  getStatus: async (statusId: string) => {
    return await Status.findById(statusId)
      .exec()
      .catch((err: any) => {
        throw err;
      });
  },

  /**
   * Get all comments of a status
   * @param statusId
   * @returns
   */
  getComments: (statusId: string) => {
    var comments = readStatus({ _id: ObjectId(statusId) }).comments;
    return comments;
  },

  /**
   * TODO: error if user not found?
   * @param statusId 
   * @param userId 
   * @returns Boolean
   */
  getStatusLikedByUser: async (statusId: string, userId: string) => {
    var liked = await Status.find({_id: ObjectId(statusId), likes: {$in: [ObjectId(userId)]}});
    return liked.length > 0;
  },
  

  /** Update */
  updateStatus: updateStatus,

  /**
   * edit a status by id
   * @param statusId
   * @param content
   * @returns Promise<Status>
   */
  editStatus: async (statusId: string, content: string) => {
    console.log(statusId);
    return await updateStatus(
      { _id: ObjectId(statusId) },
      { content: content },
      true
    );
  },

  /**
   * Add a like to a status
   * @param statusId
   * @param likeUserId
   */
  addLike: async (statusId: string, likeUserId: string) => {
    return await Status.findByIdAndUpdate(statusId, {
      $addToSet: { likes: ObjectId(likeUserId) },
      $inc: { numberOfLikes: 1 },
    })
      .exec()
      .catch((err: any) => {
        throw err;
      });
  },

  /**
   * Remove a like from a status
   * @param statusId
   * @param likeUserId
   */
  removeLike: async (statusId: string, likeUserId: string) => {
    return await Status.findByIdAndUpdate(statusId, {
      $pull: { likes: ObjectId(likeUserId) },
      $inc: { numberOfLikes: -1 },
    })
      .exec()
      .catch((err: any) => {
        throw err;
      });
  },

  markAsDeleted: async (statusId: string) => {
    return await Status.findByIdAndUpdate(statusId, {
      deleted: true,
    })
      .exec()
      .catch((err: any) => {
        throw err;
      });
  },

  /* DELETE */

  deleteStatus: (args: object) => {
    return Status.deleteOne(args).catch((err: any) => {
      if (err) throw err;
    });
  },

  /**
   * remove a status by id. returns the document if found
   * @param statusId
   * @returns Status
   */
  removeStatus: async (statusId: string) => {
    return await Status.findByIdAndDelete(Object(statusId))
      .exec()
      .then((status: typeof Status) => {
        var user = status.user;
        userController.removeStatusFromUser(user.id, status.id);
        return status;
      })
      .catch((err: any) => {
        throw err;
      });
  },

  /**
   * Remove a comment from status. Returns the status if found.
   * @param statusId
   * @returns Status
   */
  removeComment: async (statusId: string) => {
    return await module.exports.removeStatus(statusId).catch((err: any) => {
      throw err;
    });
  },
  /* FUTURE TODO
  Remove comment: 
    find the comment object
    remove comment from user's statuses list
    remove comment from parent status
    delete comment
  {
    return await Status.findById(Object(statusId))
      .then((status: typeof Status) => {
        userController.removeStatusFromUser(status.user.id, status.id);
        return Status.findByIdAndUpdate(status.parent, {
          $pull: { comments: ObjectId(statusId) },
          $inc: { numberOfComments: -1 },
        }).exec();
      })
      .then((_status: any) => {
        return Status.findByIdAndDelete(Object(statusId)).exec();
      })
      .catch((err: any) => {
        throw err;
      });
  },*/
};

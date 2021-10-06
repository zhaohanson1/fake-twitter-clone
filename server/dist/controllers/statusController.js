"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.readStatus = exports.createStatus = void 0;
var status_1 = require("../models/status");
var ObjectId = require("mongoose").Types.ObjectId;
var userController = require("../controllers/userController");
function createStatus(args) {
    var status = new status_1.Status(args);
    status.creationDate = new Date();
    return status
        .save()
        .then(function (status) { return status; })
        .catch(function (err) {
        if (err)
            throw err;
    });
}
exports.createStatus = createStatus;
function readStatus(args) {
    return status_1.Status.find(args).exec();
}
exports.readStatus = readStatus;
function updateStatus(filter, doc, new_doc) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.Status.findOneAndUpdate(filter, doc, { new: new_doc }).exec()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateStatus = updateStatus;
module.exports = {
    createStatus: createStatus,
    readStatus: readStatus,
    updateStatus: updateStatus,
    /**
     *
     * @param userId
     * @returns
     */
    getAllStatuses: function (userId) {
        var statuses = readStatus({
            user: userId,
        });
        return statuses;
    },
    /**
     * Add a status from user
     * @param userId
     * @param content
     * @returns Boolean: true if sucess
     */
    addStatus: function (userId, content) {
        return createStatus({
            user: userId,
            content: content,
        })
            .then(function (status) {
            userController.addStatusToUser(userId, status.id);
            return status;
        })
            .catch(function (err) {
            throw err;
        });
    },
    /**
     * Get a status by id
     * @param statusId
     * @returns Status
     */
    getStatus: function (statusId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.Status.findById(statusId)
                        .exec()
                        .catch(function (err) {
                        throw err;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     * edit a status by id
     * @param statusId
     * @param content
     * @returns Promise<Status>
     */
    editStatus: function (statusId, content) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateStatus({ _id: statusId }, { content: content }, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     * remove a status by id. returns the document if found
     * @param statusId
     * @returns Status
     */
    removeStatus: function (statusId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.Status.findByIdAndDelete(statusId)
                        .exec()
                        .then(function (status) {
                        var user = status.user;
                        userController.removeStatusFromUser(user.id, status.id);
                        return status;
                    })
                        .catch(function (err) {
                        throw err;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     * Get all comments of a status
     * @param statusId
     * @returns
     */
    getComments: function (statusId) {
        var comments = readStatus({ _id: statusId }).comments;
        return comments;
    },
    /**
     * Add a comment to a status. returns the comment if successful
     * @param userId {String}: the current user's id
     * @param parentId {String}: the id of the parent post
     * @param content {String} The comment's content
     * @returns
     */
    addComment: function (userId, parentId, content) {
        return createStatus({
            user: userId,
            parentId: parentId,
            content: content,
        })
            .then(function (comment) {
            status_1.Status.findByIdAndUpdate(parentId, {
                $addToSet: { comments: { _id: comment.id } },
            }).exec();
            return comment;
        })
            .then(function (comment) {
            userController.addStatusToUser(userId, comment.id);
            return comment;
        })
            .catch(function (err) {
            // rollback
            throw err;
        });
    },
    /**
     * Remove a comment from status. Returns the status if found. Wrapper for removeStatus.
     * @param statusId
     * @returns Status
     */
    removeComment: function (statusId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, module.exports.removeStatus(statusId).catch(function (err) {
                        throw err;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     * Add a like to a status
     * @param statusId
     * @param likeUserId
     */
    addLike: function (statusId, likeUserId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.Status.findByIdAndUpdate(statusId, {
                        $addToSet: { likes: ObjectId(likeUserId) },
                    })
                        .exec()
                        .catch(function (err) {
                        throw err;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     * Remove a like from a status
     * @param statusId
     * @param likeUserId
     */
    removeLike: function (statusId, likeUserId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.Status.findByIdAndUpdate(statusId, {
                        $pull: { likes: ObjectId(likeUserId) },
                    })
                        .exec()
                        .catch(function (err) {
                        throw err;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /* DELETE */
    deleteStatus: function (args) {
        return status_1.Status.deleteOne(args).catch(function (err) {
            if (err)
                throw err;
        });
    },
};

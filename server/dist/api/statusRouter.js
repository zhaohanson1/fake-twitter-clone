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
exports.statusRouter = void 0;
var express_1 = require("express");
exports.statusRouter = express_1.Router({ mergeParams: true });
var statusController = require("../controllers/statusController");
var userController = require("../controllers/userController");
/**
 *  GET /api/status/
 * Get all statuses
 */
exports.statusRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, statusController.getAllStatuses()];
            case 1:
                posts = _a.sent();
                res.json(posts);
                return [2 /*return*/];
        }
    });
}); });
/**
 * POST /api/status/
 * Add a post or comment
 */
exports.statusRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, content, parentId, post, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                content = req.body.content;
                if (!("parentId" in req.body)) return [3 /*break*/, 3];
                parentId = req.body.parentId;
                return [4 /*yield*/, statusController.addComment(userId, parentId, content)];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, userController.addStatusToUser(userId, post.id)];
            case 2:
                _a.sent();
                res.json({ success: true });
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, statusController.addStatus(userId, content)];
            case 4:
                post = _a.sent();
                return [4 /*yield*/, userController.addStatusToUser(userId, post.id)];
            case 5:
                _a.sent();
                res.json({ success: true });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * GET /api/status/:statusId
 * Get post by id
 */
exports.statusRouter.get("/:statusId", function (req, res) {
    var statusId = req.params.statusId;
    statusController
        .getStatus(statusId)
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
/**
 * PUT /api/status/:statusId
 * edit post by id
 */
exports.statusRouter.put("/:statusId", function (req, res) {
    var statusId = req.params.statusId;
    var content = req.body.content;
    statusController
        .editStatus(statusId, content)
        .then(function (status) {
        res.json({ success: true });
    })
        .catch(function (err) {
        console.error(err);
        res.json({ success: false });
    });
});
/**
 * /api/status/:statusId
 * delete post by id
 */
exports.statusRouter.delete("/:statusId", function (req, res) {
    var statusId = req.params.statusId;
    var status = statusController.getStatus(statusId);
    try {
        if (status.parent === null) {
            statusController.removeStatus(statusId);
            userController.removeStatusFromUser(statusId);
        }
        else {
            statusController.removeComment(statusId);
            userController.removeStatusFromUser(statusId);
        }
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});
/**
 * PUT /api/status/:statusId/like
 *
 */
exports.statusRouter.post("/:statusId/like", function (req, res) {
    var statusId = req.params.statusId;
    var likeUserId = req.params.user;
    statusController.addLike(statusId, likeUserId, function (err, status) {
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
/**
 * PUT /api/status/:statusId/unlike
 *
 */
exports.statusRouter.post("/:statusId/unlike", function (req, res) {
    var postId = req.params.statusId;
    var likeUserId = req.params.user;
    statusController.removeLike(postId, likeUserId, function (err, status) {
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
module.exports = exports.statusRouter;

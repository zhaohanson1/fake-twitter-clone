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
exports.getUser = exports.createUser = void 0;
var user_1 = require("../models/user");
var authController_1 = require("../controllers/authController");
function createUserValidation(args) {
    return __awaiter(this, void 0, void 0, function () {
        var emailUser, usernameUser, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (args["email"] == undefined || args["email"] == "") {
                        throw new Error("Email is missing.");
                    }
                    if (args["username"] == undefined || args["username"] == "") {
                        throw new Error("Username is missing.");
                    }
                    if (args["password"] == undefined || args["password"] == "") {
                        throw new Error("Password is missing.");
                    }
                    return [4 /*yield*/, user_1.User.findOne({ email: args["email"] })];
                case 1:
                    emailUser = _a.sent();
                    if (emailUser !== null) {
                        throw new Error("Email has already been used." + JSON.stringify(args));
                    }
                    return [4 /*yield*/, user_1.User.findOne({ username: args["username"] })];
                case 2:
                    usernameUser = _a.sent();
                    if (usernameUser !== null) {
                        throw new Error("Username has already been used.");
                    }
                    if (args["username"].length < 1 || args["username"].length > 256) {
                        throw new Error("Username is invalid length. Username should be at least 1 character long and less than or equal to 256 characters");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var createUser = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var user, bcryptObj, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, createUserValidation(args)];
            case 1:
                _a.sent();
                user = new user_1.User();
                user.email = args["email"];
                user.username = args["username"];
                return [4 /*yield*/, authController_1.saltAndHash(args["password"])];
            case 2:
                bcryptObj = _a.sent();
                user.passwordSalt = bcryptObj.salt;
                user.passwordHash = bcryptObj.hash;
                user.creationDate = new Date();
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, user];
            case 4:
                err_2 = _a.sent();
                throw err_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getUser = function (params) {
    return user_1.User.findOne(params).exec();
};
exports.getUser = getUser;
module.exports = {
    /* CREATE */
    createUser: exports.createUser,
    /* READ */
    getUser: exports.getUser,
    getUserById: function (userId) {
        return user_1.User.findOne({ _id: userId }).exec();
    },
    /* UPDATE */
    /**
     * Wrapper for updateOne
     * @export
     * @param {object} Filter: an object that contains attribute value pairs to find matching users
     * @param {object | Array} Update: replace all matching user's attributes with corresponding value
     * @returns {Query}
     */
    updateUser: function (userArgs, attributes) {
        return user_1.User.updateOne(userArgs, attributes);
    },
    addStatusToUser: function (userId, postId, callback) {
        user_1.User.findByIdAndUpdate(userId, { $addToSet: { posts: { _id: postId } } }, callback);
    },
    removeStatusFromUser: function (userId, postId, callback) {
        user_1.User.findByIdAndUpdate(userId, { $pull: { posts: { _id: postId } } }, callback);
    },
    updateLastLogin: function (id) {
        var date = new Date();
        return user_1.User.updateOne({ _id: id }, { lastLogin: date }).exec();
    },
    /* DELETE */
    deleteUser: function (params) {
        return user_1.User.deleteOne(params).catch(function (err) {
            if (err)
                throw err;
        });
    },
    deleteUserById: function (userId) {
        return module.exports.deleteUser({ _id: userId });
    },
};

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
exports.authRouter = void 0;
var express_1 = require("express");
// eslint-disable-next-line new-cap
exports.authRouter = express_1.Router({ mergeParams: true });
var user_1 = require("../models/user");
exports.authRouter.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var args, exitCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args = {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    creationDate: null,
                    passwordSalt: null,
                    passwordHash: null,
                };
                return [4 /*yield*/, user_1.createUser(args)];
            case 1:
                exitCode = _a.sent();
                if (!(exitCode instanceof Boolean)) {
                    res.json({ success: false, error_message: exitCode.message });
                }
                else {
                    res.json({ success: true });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.authRouter.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var args;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args = {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    creationDate: null,
                    passwordSalt: null,
                    passwordHash: null,
                };
                console.log(req.body);
                return [4 /*yield*/, user_1.validateUser(args)];
            case 1:
                if (_a.sent()) {
                    /*
                      give login token???
                      store login token in db
                        associate this with user
                    */
                    res.json({ success: true });
                }
                else {
                    // error or something
                    res.json({ success: false });
                }
                return [2 /*return*/];
        }
    });
}); });
module.exports = exports.authRouter;

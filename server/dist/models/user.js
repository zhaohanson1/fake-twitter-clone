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
exports.deleteUser = exports.validateUser = exports.findUser = exports.createUser = exports.User = void 0;
//Require Mongoose
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
//Define a schema
var Schema = mongoose.Schema;
var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var UserSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String },
    email: {
        type: String,
        unique: [true, "Email has already been used."],
        lowercase: true,
        trim: true,
        maxLength: 320,
        required: true,
        match: [regEmail, "Invalid email format"],
    },
    phone: { type: String },
    creationDate: { type: Date },
    lastLogin: { type: Date },
    username: { type: String, required: true, unique: true, maxLength: 256 },
    passwordSalt: { type: String, required: true },
    passwordHash: { type: String, required: true },
});
// Compile model from schema
exports.User = mongoose.model("AccountModel", UserSchema);
exports.User.init();
/* TODO: read how to write good to db */
function createUser(args) {
    var saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (_err, salt) {
        bcrypt.hash(args["password"], salt, function (_err, hash) {
            args["passwordSalt"] = salt;
            args["passwordHash"] = hash;
            args['creationDate'] = new Date();
            var newUser = new exports.User(args);
            //console.log(newUser);
            newUser.save();
        });
    });
}
exports.createUser = createUser;
function findUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = exports.User.findOne(params);
            // if doesnt exists, throw not found, else return user
            return [2 /*return*/, user];
        });
    });
}
exports.findUser = findUser;
function validateUser(args) {
    return __awaiter(this, void 0, void 0, function () {
        var query, user, password, hash, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = { username: args['username'] } || { email: args['email'] };
                    if (!query) {
                        // idk something went wrong
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, findUser(query)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    password = args['password'];
                    hash = user.get('passwordHash');
                    console.log(user);
                    console.log("Pass:" + password);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, bcrypt.compare(password, hash)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/, result];
            }
        });
    });
}
exports.validateUser = validateUser;
function deleteUser() {
    // TODO
    return false;
}
exports.deleteUser = deleteUser;
module.exports = { User: exports.User, createUser: createUser, findUser: findUser, validateUser: validateUser };

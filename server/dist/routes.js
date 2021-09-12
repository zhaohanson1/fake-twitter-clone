"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
// eslint-disable-next-line new-cap
exports.router = express_1.Router();
exports.router.get('/*', function (req, res) {
    var indexPath = path_1.default.resolve(__dirname + '../../../public/index.html');
    res.sendFile(indexPath), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    };
});
module.exports = exports.router;

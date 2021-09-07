"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
// eslint-disable-next-line new-cap
var router = express_1.Router();
router.get('/*', function (req, res) {
    var indexPath = path_1.default.resolve(__dirname + '../../../public/index.html');
    res.sendFile(indexPath), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    };
});
module.exports = router;

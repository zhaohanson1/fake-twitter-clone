"use strict";
// import 'bootstrap/dist/css/bootstrap.css';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.static('../../public'));
// const path = require('path');
var pageRouter = require('./routes.js');
var port = process.env.PORT || 3000;
app.get('/api', function (_req, res) {
    res.json({ message: 'Hello from server!' });
});
app.use('/*', pageRouter);
console.log(__dirname);
app.listen(port, function () {
    console.log("Listening on " + port);
});

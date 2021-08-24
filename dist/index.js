"use strict";
// import 'bootstrap/dist/css/bootstrap.css';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.get('/api', function (_req, res) {
    res.json({ message: 'Hello from server!' });
});
app.get('/', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname, '../dist/app.js'));
});
app.listen(port, function () {
    console.log("Listening on " + port);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.use(express.static('../../public'));
// const path = require('path');
var indexRouter = require('./routes/index');
var port = process.env.PORT || 3000;
app.get('/api', function (_req, res) {
    res.json({ message: 'Hello from server!' });
});
app.use('/', indexRouter);
app.listen(port, function () {
    console.log("Listening on " + port);
});

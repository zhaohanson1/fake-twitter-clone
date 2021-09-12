"use strict";
// import 'bootstrap/dist/css/bootstrap.css';
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static('../../public'));
var pageRouter = require('./routes');
var apiRouter = require('./api/apiRouter');
var port = process.env.PORT || 3000;
app.get('/api', function (_req, res) {
    res.json({ message: 'Hello from server!' });
});
app.use('/', pageRouter);
app.use('/api', apiRouter);
app.listen(port, function () {
    console.log("Listening on " + port);
});

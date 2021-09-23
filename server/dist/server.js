"use strict";
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
// Set up environment variables
require('dotenv').config();
// Set up database connection
require('./connectDatabase');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../../public'));
var pageRouter = require('./routes');
var apiRouter = require('./api/apiRouter');
var port = process.env.BACKEND_PORT || 3000;
app.get('/api', function (_req, res) {
    res.json({ message: 'Hello from server!' });
});
app.use('/', pageRouter);
app.use('/api', apiRouter);
app.listen(port, function () {
    console.log("Listening on " + port);
});

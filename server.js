/**
Vishaka B Sekar
REST API server in Node.js
@file:  server.js

**/
// call the packages needed
var express    = require('express');        // call express
var app        = express(); 
var router= express.Router();
var route = require('./routes/route');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));// configure app to use bodyParser()
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // setting the port
// Register the routes -------------------------------
app.use('/',route);
// Start the server ---------------------------------
app.listen(port);
console.log('Starting AddressBook server on port ' + port);


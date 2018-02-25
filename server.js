/**
Vishaka B Sekar
REST API server in Node.js
@file:  server.js

**/
// call the packages needed
var express    = require('express');        // call express
var app        = express();                 // define  app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));// configure app to use bodyParser()
                                                    //to  get the data from a POST
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // setting the port
var router = express.Router();              // get an instance of the express Router
var elastic = require('./model/db');

// Routes for API------------------------------------
/**
*   Description. Default route
**/
 
router.get('/', function(req, res) {
    res.json({ message: 'Address Book API' });   
    return elastic.initIndex().then(elastic.initMapping);
    });


/**
*   Description. GET details of a contact with the name
*   (accessed at GET http://localhost:8080/contact/:name)
*   name is a req-parameter of the GET request
**/
router.route('/contact/:name')
   .get(function(req, res) {
        elastic.getContact(req.params.name, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

/**
*   Description. GET list of all contacts
*   (accessed at GET http://localhost:8080/contact/)
**/
router.route('/contact')
   .get(function(req, res) {
        elastic.getAllContacts(req, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

/**
*   Description. POST query for inserting a new contact 
*   accessed at http://localhost:8080/contact/  
**/
router.route('/contact')  
    .post(function(req, res) {
    	elastic.addContact(req.body, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    }); 

/**
*   Description. PUT method to update contact 
*   accessed at http://localhost:8080/contact/:name
*   name is a req-param, the name of the contact to be updated 
**/
router.route('/contact/:name')
    .put(function(req, res) {
    	elastic.updateContact(req.body, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });

/**
*   Description. DELETE method to deleted contact 
*   accessed at http://localhost:8080/contact/:name
*   name is a req-param, the name of the contact to be deleted 
**/
 router.route('/contact/:name')
    .delete(function(req, res) {
    	 elastic.deleteContact(req.body, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });


// Register the routes -------------------------------
app.use('/', router);

// Start the server ---------------------------------
app.listen(port);
console.log('Starting AddressBook server on port ' + port);


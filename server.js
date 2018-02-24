// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

var elastic = require('./model/db');
router.route('/contact/:name')

   
    //  (accessed at GET http://localhost:8080/contact/:name)
    .get(function(req, res) {
         elastic.getContact(req.params.name, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });



 router.route('/contact')

   
    //  (accessed at GET http://localhost:8080/) with user query
    .get(function(req, res) {
         elastic.getAllContacts(req, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });

router.route('/contact')

   
    //  (accessed at POST http://localhost:8080/contact/)
    .post(function(req, res) {
    	
         elastic.addContact(req.body, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });

router.route('/contact/:name')

   
    //  (accessed at PUT http://localhost:8080/contact/)
    .put(function(req, res) {
    	
         elastic.updateContact(req.body, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });

 router.route('/contact/:name')

   
    //  (accessed at DELETE http://localhost:8080/contact/)
    .delete(function(req, res) {
    	
         elastic.deleteContact(req.body, function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


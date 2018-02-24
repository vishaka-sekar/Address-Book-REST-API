

module.exports = function(app) {

var express = require('express');
var router = express.Router();	
var elastic = require('../model/db');
 
// router.get('/contact/:input', function (req, res) {  
// 		console.log("HI");
// 		//elastic.getContact(req.params.name).then(function (result) { res.json(result) });
// });


// var router = express.Router();
router.get('/', function (req, res) {  
		router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
		//elastic.getContact(req.params.name).then(function (result) { res.json(result) });
});

/* POST document to be indexed */
router.post('/contact', function (req, res) {
	
	
	return elastic.initIndex().then(elastic.initMapping).then(function () {
		    
		     
		      return elastic.addContact(req.body).then(function (result) { res.json(result) });
		    
		    
		});

});
	








		    
}
var elasticsearch = require('elasticsearch');
var express= require('express');
var router= express.Router();

var client = new elasticsearch.Client({
  host: 'localhost:9200',         //initialize and start the elasticearch server on port 9200
 
});

var indexName = 'addressbookindex'                 // define  app using express


// Routes for API------------------------------------
/**
*   Description. Default route
**/
 
router.get('/', function(req, res) {
      
     return client.indices.putMapping({  // initialize the mapping of JSON fields
        index: indexName,
        type: "contact",
        
        body: {
            properties: {
                name: { type: "text" }, //firstname :  string
                lastname: {type: "text"},// lastname:  string
                phone: { type: "long"}, // phone number: number
                email: {type: "keyword" , ignore_above: 5}, // email: sequence of characters
                address: {type: "keyword"} // address: also a keyword
   
            }
        }
    }, function(err, response){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.status(200).send({ message: 'Address Book API' }); 
        }



    });

});


/**
*   Description. GET details of a contact with the name
*   (accessed at GET http://localhost:8080/contact/:name)
*   name is a req-parameter of the GET request
**/
router.route('/contact/:name')
   .get( function(req, res) {
            var input = req.params.name;

            client.search({       //searching the elasticsearch index
                index: indexName,
                type: 'contact',
                body: {
                    query: {
                        query_string:{
                           query: input // the query string is the name of the contact
                        }
                    }
                }
        }).then(function (resp) {
             var results = resp.hits.hits.map(function(hit){
                return hit._source;
            });
            console.log(results); //returns the list of the search
            console.log(resp);
            res.status(200).send(results);

            
        });

     });

/**
*   Description. GET list of all contacts
*   (accessed at http://localhost:8080/?pageSize={}&page={}&query={})
**/
router.route('/contact')
   .get(function(req, res) {
        //todo
    });

/**
*   Description. POST query for inserting a new contact 
*   accessed at http://localhost:8080/contact/  
*   al params are passed in the req.body
**/
router.route('/contact')  
    .post(function(req, res) {

    	  var input = req.body;
            client.index({           //client.index is the elasticsearch.js method to insert a document
                index: indexName,
                type: 'contact',
                body: {
                        name: input.name, 
                        lastname: input.lastname,
                        email: input.email,
                        phone: parseInt(input.phone),
                        address: input.address
                }
        }, function (error,response) {
              if(error) return console.log('ERROR',error);
              else{
                console.log(response);
                res.sendStatus(200);
                

              }
            
          
        });
    }); 

/**
*   Description. PUT method to update contact 
*   accessed at http://localhost:8080/contact/:name
*   name is a req-param, the name of the contact to be updated 
**/
router.route('/contact/:name')
    .put(function(req, res) {
        input = req.body;

    	 client.updateByQuery({ 
           index: indexName,
           type: 'contact',
           body: { 
              "query": { "match": { "name": input.oldname } }, 
              "script":  "ctx._source.name =  "+ "'"+input.newname +" ' "+";" 
           }
        }, function(err, response) { 
            if (err) { 
               console.log(err);
               res.sendStatus(500);

            } 
            console.log(response);
            res.status(200).send(response);
        }
    )
    });

/**
*   Description. DELETE method to deleted contact 
*   accessed at http://localhost:8080/contact/:name
*   name is a req-param, the name of the contact to be deleted 
**/
 router.route('/contact/:name')
    .delete(function(req, res) {

        input = req.params.name;

         client.deleteByQuery({
              index: indexName,
              type: 'contact',
              body: {
                 query: {
                     match: { name: input }
                 }
              }
      }, function (error, response) {
          
          if(error){
            console.log(error);
            res.sendStatus(500);
          }
           
            else{
                res.status(200).send(response);
            }
          
      });
    	 
    });


module.exports = router;
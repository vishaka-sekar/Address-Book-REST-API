/**
Vishaka B Sekar
Back-end logic to implement methods in elasticsearch.js for REST api 
@file:  db.js

**/
// call elasticsearch package
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',         //initialize and start the elasticearch server on port 9200
 
});

var indexName = 'addressbookindex'  //index is the collection of contacts

/**
* Description. Delete an existing index
*/
function deleteIndex() {  
    return client.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* Description. Creates an index 
* @param: indexName
*/
function initIndex() {  
    return client.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* Description. check if the index exists 
* @param:indexName 
*/
function indexExists() {  
    return client.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;  

/**
* Description. describes the number and type of fields in the index
* Initializing the model
* @param:indexName 
*/
function initMapping() {  
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
    });
}
exports.initMapping = initMapping;

/**
* Description. returns a list of all contacts
* @param: number of contacts per page
* @param: offset of number of pages
* @param: query string 
* All paramters are passed in the GET request
* Initializing the model
* @param:indexName 
*/
function getAllContacts(request) { 

var pageNum = parseInt(request.query.page); //parse parameters from the req param
var perPage = parseInt(request.query.pageSize);
var userQuery = parseInt(request.query.query);


var searchParams = {
  index: indexName,
  from: (pageNum - 1) * perPage,
  size: perPage,
  body: {
          "query": {
        "match_all": {} // elasticsearch query to return all records
    }
  }
};
console.log('search parameters', searchParams);
client.search(searchParams, function (err, res) {
  if (err) {
    // handle error
    throw err;
  }

  console.log('search_results', {
    results: res.hits.hits,
    page: pageNum,
    pages: Math.ceil(res.hits.total / perPage)
  });

   var results = res.hits.hits.map(function(hit){
            return hit._source.name + " " + hit._source.lastname;
        });
    console.log(results);
});

}
exports.getAllContacts = getAllContacts;

/**
*Description. method to add a contact
* @param: req.body 
* All paramters are passed in the POST request body
* 
*/
function addContact(input) { 
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
        }, function (error, response) {
          console.log(response);
        });
 
}
exports.addContact = addContact;

/**
*Description. method to get  a contact
* @param: name: req.body 
* All paramters are passed in the GET request body
*/
function getContact(input){
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
            return hit._source.name + " " + hit._source.lastname;
        });
        console.log(results); //returns the list of the search
        console.log(resp);

        
    }, function (res,err) {
        if(err)
        console.log(err.message);
        res.send(resp);
    });

 }


exports.getContact = getContact;

/**
*Description. method to update a contact
* @param: req.body.oldname - the name to be updated
* @param: req.param.newname - new name
*/
function updateContact(input) { 
     client.updateByQuery({ 
           index: indexName,
           type: 'contact',
           body: { 
              "query": { "match": { "name": input.oldname } }, 
              "script":  "ctx._source.name =  "+ "'"+input.newname +" ' "+";" 
           }
        }, function(err, res) { 
            if (err) { 
               console.log(err) 
            } 
            console.log(res);
        }
    )

}
exports.updateContact = updateContact;

/**
*Description. method to delete a contact
* @param: req.param.name - the name to be deleted
* */
function deleteContact(input) { 
  client.deleteByQuery({
          index: indexName,
          type: 'contact',
          body: {
             query: {
                 match: { name: input }
             }
          }
      }, function (error, response) {
          console.log(response);
          if(error)
           console.log(error);
          
      });


}
exports.deleteContact = deleteContact;

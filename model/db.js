var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
 
});

var indexName = 'stpp'
/**
* Delete an existing index
*/
function deleteIndex() {  
    return client.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return client.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return client.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;  



function initMapping() {  
    return client.indices.putMapping({
        index: indexName,
        type: "contact",
        
        body: {
            properties: {
                name: { type: "text" },
                lastname: {type: "text"},
                phone: { type: "long"},
                email: {type: "keyword" , ignore_above: 5},
                address: {type: "text"}
   
            }
        }
    });
}
exports.initMapping = initMapping;

function getAllContacts(request) { 

var pageNum = parseInt(request.query.page);
var perPage = parseInt(request.query.pageSize);
var userQuery = parseInt(request.query.query);


var searchParams = {
  index: indexName,
  from: (pageNum - 1) * perPage,
  size: perPage,
  body: {
          "query": {
        "match_all": {}
    }
  }
};
console.log(searchParams);
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
});

}
exports.getAllContacts = getAllContacts;

function addContact(input) { 
    client.index({
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

function getContact(input){
    client.search({
        index: indexName,
        type: 'contact',
        body: {
            query: {
                query_string:{
                   query: input
                }
            }
        }
    }).then(function (resp) {
         var results = resp.hits.hits.map(function(hit){
            return hit._source.name + " " + hit._source.lastname;
        });
        console.log(results);
        console.log(resp);

        
    }, function (res,err) {
        if(err)
        console.log(err.message);
        res.send(resp);
    });

 }


exports.getContact = getContact;






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



function deleteContact(input) { 
  client.deleteByQuery({
          index: indexName,
          type: 'contact',
          body: {
             query: {
                 match: { name: input.name }
             }
          }
      }, function (error, response) {
          console.log(response);
          if(error)
           console.log(error);
          
      });


}
exports.deleteContact = deleteContact;

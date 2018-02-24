var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
 
});

var indexName = 'myaddressbook'
/**
* Delete an existing index
*/
// function deleteIndex() {  
//     return elasticClient.indices.delete({
//         index: indexName
//     });
// }
// exports.deleteIndex = deleteIndex;

// /**
// * create the index
// */
// function initIndex() {  
//     return elasticClient.indices.create({
//         index: indexName
//     });
// }
// exports.initIndex = initIndex;

// /**
// * check if the index exists
// */
// function indexExists() {  
//     return elasticClient.indices.exists({
//         index: indexName
//     });
// }
// exports.indexExists = indexExists;  

// indexExists.then(function (exists) {  
//   if (exists) { 
//     return deleteIndex(); 
//   } 
// }).then(initIndex);

// function initMapping() {  
//     return elasticClient.indices.putMapping({
//         index: indexName,
//         type: "contact",
//         //ignore: [400]
//         body: {
//             properties: {
//                 name: { type: "text" },
                
                
//             }
//         }
//     });
// }
// exports.initMapping = initMapping;

function getAllContacts(request) { 

var pageNum = parseInt(request.query.page);
var perPage = parseInt(request.query.pageSize);
var userQuery = parseInt(request.query.query);
//console.log(parseInt(request.params.page));

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
          location: input.location
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
            return hit._source.name + " " + hit._source.location;
        });
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


// client.search({
//   index: indexName,
//   type: 'contact',
//  body: {
//             "query": {
//                 "query_string":{
//                    "query": input.name
//                 }
//             }
//         }
// }).then(function (body) {
//   var results = body.hits.hits.map(function(hit){
//             return hit._id;
//         });
//   console.log(results);




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

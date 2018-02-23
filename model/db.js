var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


//Elastic search uses indices to store documents
//creating index
client.indices.create({
     index: 'addressbook'
 }, function(err, resp, status) {
     if (err) {
         console.log(err);
     } else {
         console.log("create", resp);
     }
 });

client.index({
     index: 'addressbook',
     id: '1',
     contact: {
         "Name": "Integrating Elasticsearch into Node.js Application",
         "Location": "santa clara",
         "Details": " Elasticsearch in  Node.js application.",
     }
 }, function(err, resp, status) {
     console.log(resp);
 });
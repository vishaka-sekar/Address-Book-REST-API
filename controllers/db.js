var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});



 addContact  { 
return client.indices.create({
     index: 'addressbook',
     id: '1',
     contact: {
         "Name": "Integrating Elasticsearch into Node.js Application",
         "Location": "santa clara",
         "Details": " Elasticsearch in  Node.js application.",
 }, function(err, resp, status) {
     if (err) {
         console.log(err);
     } else {
         console.log("create", resp);
     }
 });

}
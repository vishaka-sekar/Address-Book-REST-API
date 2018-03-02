##### A REST API of an address book using Express and Elastic Search
Vishaka B Sekar,
Santa Clara University,CA

######  Reasons for choosing Express and Node.js
Node.js is highly robust, scalable, asynchronous, fast framework for rapid development.
###### Capabilities:
*	GET - Get a list of all contacts, Get contacts by name
*	POST - Insert a new contact
*	PUT - Update a contact
*	DELETE - Delete a contact
###### Dependencies:
*	node.js
*	express
*	elasticsearch datastore
###### Installation:
Clone the git repository / download and extract the .zip file. Navigate into the root of your application on commandline and type
`npm install` . It will install all the dependencies listed in package.json.
Download and install elasticsearch from https://www.elastic.co/downloads/elasticsearch
###### How to run the code:
* Navigate into the root of the application and type `node server.js` to start the server. The server can be accessed at `http://localhost:8080`, 
The port can be configured in line 14 of `server.js`. 
`var port = process.env.PORT || 8080`

* Start the elasticsearch server by running the elasticsearch.exe in admin mode. The Elastic Search server can be accessed at `http://localhost:9200`. All the contents can be accessed at `http://localhost:9200/_cat/indices/` 
On your browser, type `http://localhost:9200`, a startup message indicates that Elastic Search is up and running.

###### REST API URLs
* GET	` http://localhost:8080/contact/:{name}`
* GET(all contacts) `http://localhost:8080/?pageSize={size}&page={offset}&query={elasticsearch-query-string}`
* POST `http://localhost:8080/contact/` the request.body looks like:
	```json
	{
		"name": "roger",
		"lastname": "federer",
		"email": "rf@example.com",
		"phone":"123456",
		"address": "Zurich"
	}
	```
	
	```json
	{
		"name": "serena",
		"lastname": "williams",
		"email": "sw@example.com",
		"phone":"1456",
		"address": "Florida,USA"
	}
	```

* PUT `http://localhost:8080/contact/:{name}`
	```json
	{
	"oldname": "rafael",
	"newname": "rafa"
	}
	```
	
* DELETE `http://localhost:8080/contact/:{name}`

###### Testing 
* The API was tested using the Postman tool. The screenshots, sample input and output of all test cases are included in the Screenshots.pdf file.
		



	
	




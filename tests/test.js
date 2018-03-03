var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8080');


describe('Contact', function(){

	it('Index should be created',  function(done){
		api.get('/')
		.set('Accept', 'application/json')
		.expect(200, done);
	});
	
	it('POST should return 200 response',  function(done){
		api.post('/contact/')
	    .set('Accept', 'application/json')
	    .send({
		     name: "Lori",
		     lastname: "Ipsum",
		     address: "OR",
		     email: "lIpsum@examaple.com",
		     phone: "1234567890"
	    })
	    .expect(200,done);
	});

	it('POST should return 200 response',  function(done){
		api.post('/contact/')
	    .set('Accept', 'application/json')
	    .send({
		     name: "John",
		     lastname: "Doe",
		     address: "OR",
		     email: "jdoe@examaple.com",
		     phone: "1234567800"
	    })
	    .expect(200,done);
	});
	
   		it('Waiting for POST to complete', function(done){
      	setTimeout(function(){
        	console.log('waiting over.');
           	done();
       		}, 1900)
   	})

	it('Verifying Contact details', function(done) {
	    api.get('/contact/Lori')
	    .set('Accept', 'application/json')
	    .expect(200)
	    .end(function(err, res) {
	      	expect(res.body).to.include.deep.members( [{ name: 'Lori',
    		lastname: 'Ipsum',
    		email: 'lIpsum@examaple.com',
    		phone: 123456,
    		address: 'OR' }] );
 	      	done();
    	});

  	});

	it('Update a Contact', function(done) {
	    api.put('/contact/Lorai')
	    .set('Accept', 'application/json')
	    .send({oldname: 'Lori', newname: 'Lorai'})
	    .expect(200,done);
	 });

	it('Get all contacts', function(done) {
	    api.get('/contact/?pageSize=1&page=2&query=test')
	    .set('Accept', 'application/json')
	    .send({
		     pageSize: "1",
		     pageNum: "2",
		     query: "test",
		    })
	    .expect(200,done);
	 });

	it('Delete a contact', function(done) {
	    api.delete('/contact/John')
	    .set('Accept', 'application/json')
	    .send({name: 'John'})
	    .expect(200,done);
	 });

	

	




}); //end


var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8080');


describe('Contact', function(){

	it('should return 200 response',  function(done){
		api.get('/')
		.set('Accept', 'application/json')
		.expect(200, done);
	});
	
	it('post should return 200 response',  function(done){
		api.post('/contact/')
	    .set('Accept', 'application/json')
	    .send({
		     name: "Lori",
		     lastname: "Ipsum",
		     address: "OR",
		     email: "lIpsum@examaple.com",
		     phone: "123456"
	    })
	    .expect(200,done);
	});
	
   		it('Waiting for post to complete', function(done){
      	setTimeout(function(){
        	console.log('waiting over.');
           	done();
       		}, 1900)
   	})

	it('get response should be an array', function(done) {
	    api.get('/contact/lorai')
	    .set('Accept', 'application/json')
	    .expect(200)
	    .end(function(err, res) {
	      	expect(res.body).to.include.deep.members( [{ name: 'lorai ',
    		lastname: 'Ipsum',
    		email: 'lIpsum@examaple.com',
    		phone: 123456,
    		address: 'OR' }] );
 	      	done();
    	});

  	});

	it('put response should be an array', function(done) {
	    api.put('/contact/lorai')
	    .set('Accept', 'application/json')
	    .send({oldname: 'lorai', newname: 'lori'})
	    .expect(200,done);
	 });

	it('delete response ', function(done) {
	    api.delete('/contact/serena')
	    .set('Accept', 'application/json')
	    .send({name: 'serena'})
	    .expect(200,done);
	 });

	it('get all contacts ', function(done) {
	    api.get('/contact/?pageSize=1&page=2&query=test')
	    .set('Accept', 'application/json')
	    .send({
		     pageSize: "1",
		     pageNum: "2",
		     query: "test",
		    })
	    .expect(200,done);
	 });

	




}); //end


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
		    .set('Accept', 'application/x-www-form-urlencoded')
		    .send({
		      name: "Lori",
		      lastname: "Ipsum",
		      address: "OR",
		      email: "lIpsum@examaple.com",
		      phone: "123456"
		    })
		    //.expect('Content-Type', /json/)
		    .expect(200,done);
		    

		    
		  });

	
   		it('tiny test case', function(done){
       console.log('waiting 3 seconds');
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
	    api.put('/contact/lori')
	    .set('Accept', 'application/json')

	    .send({oldname: 'lora', newname: 'lorai'})
	    .expect(200,done);
	    

  });




}); //end


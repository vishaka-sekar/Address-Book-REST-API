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

	// it('should be an object with keys and values', function(done) {
	//     api.get('/users/serena')
	//     .set('Accept', 'application/json')
	//     .expect(200)
	//     .end(function(err, res) {
	//       expect(res.body).to.have.property("name");
	//       expect(res.body.name).to.not.equal(null);
	//       expect(res.body).to.have.property("lastname");
	//       expect(res.body.name).to.not.equal(null);
	//       expect(res.body).to.have.property("email");
	//       expect(res.body.email).to.not.equal(null);
	//       expect(res.body).to.have.property("phone");
	//       expect(res.body.phoneNumber).to.not.equal(null);
	//       expect(res.body).to.have.property("address");
	//       expect(res.body.role).to.not.equal(null);
	//       done();
 //    });

 //  });

	it('should return 200 response',  function(done){

		 api.post('/contact/')
		    .set('Accept', 'application/x-www-form-urlencoded')
		    .send({
		      name: "John",
		      lastname: "Doe",
		      address: "OR",
		      email: "jdoe@examaple.com",
		      phone: "123456"
		    })
		    //.expect('Content-Type', /json/)
		    .expect(200,done);
		    

		    
		  });



}); //end


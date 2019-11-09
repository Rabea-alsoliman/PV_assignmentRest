const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');
const User = require('../../../models/user.model');
const should = chai.should();
chai.use(chaiHttp);


describe("users", () => {

  beforeEach((done) => {
    const newUser = new User({
      username: 'rrabea',
      firstName: 'rabea',
      lastName: "soliman",
      email: "rabea@rabea.com",
      password: '123456',
      userImg: 'test'
    });
      newUser.save((err) => {
      done();
      });
    });

  afterEach((done) => {
    User.collection.drop();
    done();
  });  

  it ("Should fecth all the users on /users GET", (done)=>{
      chai.request(app)
      .get("/users")
      .end((err, res) => {
        res.should.have.status(200);
        //console.log ("Result Body",res.body)
        res.should.be.json;
        res.body.users.should.be.a('array');
        const body = res.body.users[0];
        body.should.have.property('_id');
        body.should.have.property('username');
        body.should.have.property('firstName');
        body.should.have.property('lastName');
        body.should.have.property('email');
        body.should.have.property('password');
        body.should.have.property('userImg');
        body.username.should.equal('rrabea');
        body.firstName.should.equal('rabea');
        body.lastName.should.equal('soliman');
        body.email.should.equal('rabea@rabea.com');
        body.password.should.equal('123456');
        body.userImg.should.equal('test');
        done();
      })

  });

  it('should fecth one user on /users/<id> GET', (done) => {
    const newUser = new User({
        username: 'rrabea1',
        firstName: 'rabea',
        lastName: "soliman",
        email: "rabea@rabea.com",
        password: '123456',
        userImg: 'test'
    });

    newUser.save((err, data) => {
      chai.request(app)
      .get('/users/'+data.id)
      .end((err, res) => {
        res.should.have.status(200);
        //console.log ("Result Body",res.body)
        res.should.be.json;
        const body = res.body.user;
        body.should.have.property('_id');
        body.should.have.property('username');
        body.should.have.property('firstName');
        body.should.have.property('lastName');
        body.should.have.property('email');
        body.should.have.property('password');
        body.should.have.property('userImg');
        body._id.should.equal(data.id);
        body.username.should.equal('rrabea1');
        body.firstName.should.equal('rabea');
        body.lastName.should.equal('soliman');
        body.email.should.equal('rabea@rabea.com');
        body.password.should.equal('123456');
        body.userImg.should.equal('test');
        done();
      });
    });
  });

  it('should add user on /users POST', (done) => {
    chai.request(app)
      .post('/users')
      .send({
        'username': 'rrabea2',
        'firstName': 'rabea',
        'lastName': "soliman",
        'email': "rabea@rabea.com",
        'password': '123456',
        'userImg': 'test'
      })
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        const body = res.body;
        body.should.have.property('_id');
        body.should.have.property('username');
        body.should.have.property('firstName');
        body.should.have.property('lastName');
        body.should.have.property('email');
        body.should.have.property('password');
        body.should.have.property('userImg');
        body.username.should.equal('rrabea2');
        body.firstName.should.equal('rabea');
        body.lastName.should.equal('soliman');
        body.email.should.equal('rabea@rabea.com');
        //body.password.should.equal('123456');
        body.userImg.should.equal('test');
        done();
      });
  });

  it('should delete a single user on /users/<id> DELETE', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        //console.log(res.body.users[0]._id);
        chai.request(app)
          .delete('/users/'+res.body.users[0]._id)
          .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('success');
          done();
        });
      });
  });

  it('should update a SINGLE user on /users/<id> PUT', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        console.log(res.body.users[0]._id);
        chai.request(app)
          .patch('/users/'+res.body.users[0]._id)
          .send({
            'firstName': 'rabea1',
            'lastName': "soliman1"  
          })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            //console.log(response.body);
            response.body.should.have.property('success');
            done();
        });
      });
  });

});

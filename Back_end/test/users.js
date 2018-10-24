import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import User from '../models/user';

const should = chai.should();
chai.use(chaiHttp);

describe('Users',  () => {
    before(async () => {
        await User.remove({});

        for (let i = 0; i <= 10; i++) {
            await User.create({
                method: 'local',
                login: `user${i}`,
                password: 'password'
            });
        }
    });

    after(async () => {
        User.remove({})
    });

    it('should return most active users', done => {
       chai.request(server)
           .get(`/api/users`)
           .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.length.should.be.below(6);
                res.body[0].should.have.property('x');
                res.body[0].should.have.property('y');
                done();
           })
    });

    it('should return 404 status because user is not registered', done => {
        chai.request(server)
            .post('/api/login')
            .send({ login: 'notExistingUser', password: 'password' })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message').eql('User not found');
                done();
            });
    });

    it('should return 400 status because password is not correct', done => {
        chai.request(server)
            .post('/api/login')
            .send({ login: 'user1', password: 'badPassword' })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Bad credentials');
                done();
            });
    });

    it('should log in user', done => {
       chai.request(server)
           .post('/api/login')
           .send({ login: 'user1', password: 'password' })
           .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('login');
                res.body.should.have.property('token');
               done();
           });
    });

    it('should return status 400 because user with the same login already exists', done => {
        chai.request(server)
            .post('/api/signup')
            .send({ login: 'user1', password: 'password' })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('User with the same login already exists');
                done();
            })
    });

    it('should sign up user', done => {
       chai.request(server)
           .post('/api/signup')
           .send({ login: 'newUser', password: 'password' })
           .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');

                User.findOne({ login: 'newUser' })
                    .then((user) => {
                        user.should.have.property('login').eql('newUser');
                    })
                    .then(done());
           })
    });

    it('should return 401 status because social token is not valid', done => {
        chai.request(server)
            .post('/api/oauth/facebook')
            .send({ token: 'token' })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import config from '../config';
import server from '../server';
import Dish from '../models/dish';
import User from '../models/user';

const should = chai.should();
chai.use(chaiHttp);

describe('Dishes',  () => {
    let token;
    let dishID;

    before(async () => {
        const user = await User.create({
            method: 'local',
            login: 'login',
            password: 'password'
        });

        token = jwt.sign({
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, config.secret);
    });

    beforeEach(async () => {
        await Dish.remove({});
        await Dish.create({ name: 'name', description: 'description', img: 'img' });
        const dish = await Dish.create({ name: 'name2', description: 'description', img: 'img' });

        dishID = dish._id;
        await Dish.findOneAndUpdate({ _id: dishID }, { $set: { isPublished: true } })
    });

    after(async () => {
        await User.remove({});
        await Dish.remove({});
    });

    it('should get only published dishes', done => {
        chai.request(server)
            .get('/api/dishes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.docs.length.should.be.eql(1);
                res.body.docs[0].should.have.property('isPublished').eql(true);
                done();
            });
    });

    it('should get most popular published dishes', done => {
        chai.request(server)
            .get('/api/dishes/popular')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.below(6);
                done();
            });
    });

    it('should get all dishes for admin', done => {
        chai.request(server)
            .get('/api/dishes')
            .query({isAdmin: 'true'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.docs.should.be.a('array');
                res.body.docs.length.should.be.eql(2);
                done();
            });
    });

    it('should return error because dish with the same name already exists', done => {
        chai.request(server)
            .post('/api/dishes')
            .set('Authorization', token)
            .send({ name: 'name', description: 'description', img: 'img' })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Dish with the same name already exists');
                done();
            });
    });

    it('should add dish', done => {
        chai.request(server)
            .post('/api/dishes')
            .set('Authorization', token)
            .send({ name: 'newName', description: 'description', img: 'img' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('newName');
                res.body.should.have.property('description').eql('description');
                res.body.should.have.property('img').eql('img');
                res.body.should.have.property('isPublished').eql(false);
                res.body.should.have.property('numberOfOrders').eql(0);
                res.body.should.have.property('creationDate');
                done();
            });
    });

    it('should return 401 status without providing token', done => {
        const id = '5a575ca1429fe31af837a024';

        chai.request(server)
            .delete(`/api/dishes/${id}`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('should remove dish', done => {
        const id = '5a575ca1429fe31af837a024';

        chai.request(server)
            .delete(`/api/dishes/${id}`)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.equal(id);
                done();
            });
    });

    it('should update dish', done => {
        chai.request(server)
            .put(`/api/dishes/${dishID}`)
            .set('Authorization', token)
            .query({name: 'updatedName'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
    });
});

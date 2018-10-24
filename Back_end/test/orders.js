import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import config from '../config';
import server from '../server';
import Order from '../models/order';
import User from '../models/user';
import Dish from '../models/dish';

const should = chai.should();
chai.use(chaiHttp);

describe('Orders',  () => {
    let token;
    let orderID;

    before(async () => {
        const user = await User.create({
            method: 'local',
            login: 'login',
            password: 'password'
        });

        await Dish.create({ name: 'name', description: 'description', img: 'img' });

        token = jwt.sign({
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, config.secret);
    });

    beforeEach(async () => {
        await Order.remove({});
        const order = await Order.create({ dishes: [{ name: 'name', quantity: 1 }], user: 'user' });
        orderID = order._id;
    });

    it('should get active orders', done => {
        chai.request(server)
            .get('/api/orders')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.length.should.be.eql(1);
                res.body[0].should.have.property('isActive').eql(true);
                res.body[0].should.have.property('user');
                res.body[0].should.have.property('creationDate');
                res.body[0].should.have.property('dishes').to.be.an('array');
                res.body[0]['dishes'][0].should.have.property('name');
                res.body[0]['dishes'][0].should.have.property('quantity');
                done();
            });
    });

    it('should create order', done => {
        chai.request(server)
            .post('/api/orders')
            .set('Authorization', token)
            .send({ dishes: [
                { name: 'Some dish name', quantity: 3 },
                { name: 'Some another dish name', quantity: 1 }
            ], user: 'user' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('isActive').eql(true);
                res.body.should.have.property('user').eql('user');
                res.body.should.have.property('creationDate');
                res.body.should.have.property('dishes').to.be.an('array');
                res.body['dishes'].length.should.be.eql(2);
                res.body['dishes'][0].should.have.property('name').eql('Some dish name');
                res.body['dishes'][0].should.have.property('quantity').eql(3);
                done();
            });
    });

    it('should increase number of dish orders', done => {
        chai.request(server)
            .post('/api/orders')
            .set('Authorization', token)
            .send({ dishes: [
                { name: 'name', quantity: 1 }
            ], user: 'user' })
            .end(async (err, res) => {
                res.should.have.status(200);
                const dish = await Dish.findOne({ name: 'name' });
                dish.numberOfOrders.should.be.eql(1);
                done();
            });
    });

    it('should increase number of user\'s orders', done => {
        chai.request(server)
            .post('/api/orders')
            .set('Authorization', token)
            .send({ dishes: [
                { name: 'name', quantity: 1 }
            ], user: 'login' })
            .end(async (err, res) => {
                res.should.have.status(200);
                const user = await User.findOne({ login: 'login' });
                user.numberOfOrders.should.be.eql(1);
                done();
            });
    });

    it('should return 401 status without providing token', done => {
        chai.request(server)
            .put(`/api/orders/${orderID}`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('should close active order', done => {
        chai.request(server)
            .put(`/api/orders/${orderID}`)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql(orderID.toString());
                done();
            });
    });

    it('should return days of orders', done => {
        chai.request(server)
            .get('/api/orders/days')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body[0].should.have.property('day');
                done();
            });
    });
});

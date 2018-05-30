const expect = require('chai').expect;
const should = require('chai').should;
const supertest = require('supertest');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

const User = require('../app/models/user');

const api = supertest('localhost:3333/api/');

var db = mongoose.connect('mongodb://127.0.0.1:27017/db');

// clean up before each test case
beforeEach(function (done) {
    // console.log(User1);
    let UserModel = mongoose.model('User');
    UserModel.remove({}).then(() => done());
});

/**
 * GET /users TEST CASES
 */
describe("GET /users", function () {

    it("should return a 200 response", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjAxNDM1MmJkYTdmNzQxOTdmMmYyZDQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI2ODA5NDI2fQ.zk5qZ6VXZyNcsag28ycqkEVJrrjTqf48xxRMFCOfLyk')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("should return a 401 response", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'wrong token')
            .expect(401, done);
    });

    it("should return user list", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjAxNDM1MmJkYTdmNzQxOTdmMmYyZDQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI2ODA5NDI2fQ.zk5qZ6VXZyNcsag28ycqkEVJrrjTqf48xxRMFCOfLyk')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.resCode).to.equal('0000');
                expect(res.body).to.have.property('resBody');
                done();
            })
    });
});


/**
 * POST /user TEST CASES
 */
describe('POST /users', function () {
    let data = {
        name: 'test_user',
        accessToken: '',
        points: 500,
        email: 'admin@pte90.com', // valid by validator
        tokens: [],
        password: "1111111"
    }
    var theResponse;


    // to include multiple it(..) in one request
    before(function (done) {
        api.post('users')
            .end(function (err, res) {
                theResponse = {
                    err: err,
                    res: res
                };
                // console.log(theResponse);
                // Add multiple it() here
            });
        done();
    });


    it('respond with 200 OK', function (done) {

        api.post('users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('should return a user', function (done) {

        api.post('users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * POST /items TEST CASES
 */
describe("GET /items", function () {

    it("should return a 200 response", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjAxNDM1MmJkYTdmNzQxOTdmMmYyZDQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI2ODA5NDI2fQ.zk5qZ6VXZyNcsag28ycqkEVJrrjTqf48xxRMFCOfLyk')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("should return a 401 response", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'wrong token')
            .expect(401, done);
    });

    it("should return user list", function (done) {
        api.get('users')
            .set('Accept', 'application/json')
            .set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjAxNDM1MmJkYTdmNzQxOTdmMmYyZDQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI2ODA5NDI2fQ.zk5qZ6VXZyNcsag28ycqkEVJrrjTqf48xxRMFCOfLyk')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.resCode).to.equal('0000');
                expect(res.body).to.have.property('resBody');
                done();
            })
    });
});
// var xss = require('xss')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = mongoose.model('User');
const uuid = require('uuid');


/**
 * User login method
 * 1. check credentials
 * 2. update token
 * @param {*} next 
 */
exports.login = function* (next) {

  let { email, password } = this.request.body;

  try {

    let user = yield User.findByCredentials(email, password);
    console.log(user);
    let token = yield user.generateAuthToken();
    console.log(user);
    user = yield user.save();
    this.set('x-auth', token);
    this.body = user;

  } catch (e) {
    this.status = 403;
    this.body = {
      error: e,
      success: false
    }
  }
  return next
}


exports.new = function* (next) {

  // this === ctx
  // console.log(this.request);
  // console.log(this.request.query);
  // console.log(this.request.body);

  try {
    var user = new User({
      name: 'pte90',
      accessToken: uuid.v4(),
      points: 500,
      email: 'admin@pte90.com', // valid by validator
      tokens: [],
      password: "1111111"
    });
    let token = yield user.generateAuthToken();
    console.log(user);
    user = yield user.save();
    // set header
    this.set('Cache-Control', 'no-cache');
    this.set('x-auth', token);
    this.body = user;
  } catch (e) {
    this.body = {
      error: e,
      success: false
    }
  }
  return next
}

exports.list = function* (next) {
  try {
    let users = yield User.find()
    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody: users
    }
  } catch (e) {
    this.body = {
      resCode: '9999',
      resMsg: e.toString(),
      resBody: []
    }
  }
  return next
}

exports.show = function* (next) {
  console.log(this.request.query);

  console.log(this.params);
  let users = yield User.find({ _id: this.params.id })
  this.body = users
  return next
}
exports.update = function* (next) {
  let res = this.request.body;
  try {
    let user = yield User.update({ _id: res.id, }, { points: res.points })
    this.body = {
      resCode: '0000',
      resMsg: 'moidfy user success',
      resBody: user
    }
  }
  catch (e) {
    console.log(e)
  }

  return next
}

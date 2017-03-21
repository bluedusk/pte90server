'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var User = mongoose.model('User')
var uuid = require('uuid')

// signup
exports.validToken = function *(next){
  var user = new User({
    name: 'helloworld',
    accessToken: uuid.v4()
  });

  try {
    console.log(user.toString());
    user = yield user.save();
    this.body = user
  } catch (e) {
    this.body = {
    success: false
    }
  }
  return next
}

// get users list
exports.list = function *(next){
    let users = yield User.find()
    this.body = users
    return next
}

exports.show = function *(next){
    let users = yield User.find({_id:"58b523c3ef8312ab91fef301"})
    this.body = users
    return next
}

'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')

exports.signup = function *(next){
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

exports.getAllUser = function *(next){
  
}

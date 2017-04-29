'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var User = mongoose.model('User')
var uuid = require('uuid')

exports.new = function *(next){


  console.log(this.request);
  console.log(this.request.query);
  console.log(this.request.body);

  var user = new User({
    name: 'user',
    accessToken: uuid.v4(),
    points: 500
  });

  try {
    //console.log(user.toString());
    user = yield user.save();
    this.body = user
  } catch (e) {
    this.body = {
    success: false
    }
  }
  return next
}

exports.list = function *(next){
  try {
    let users = yield User.find()
    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody:users
      }
    } catch (e) {
    this.body = {
      resCode: '9999',
      resMsg: e.toString(),
      resBody:[]
    }
  }
    return next
}

exports.show = function *(next){
  console.log(this.request.query);

    console.log(this.params);
    let users = yield User.find({_id:this.params.id})
    this.body = users
    return next
}
exports.update = function *(next){
    let res = this.request.body;

    let user = yield User.update({_id:res.id,},{points:res.points})
    this.body = {
      resCode: '0000',
      resMsg: 'moidfy user success',
      resBody:user
      }
    return next
}

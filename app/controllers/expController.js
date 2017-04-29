'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
var Experience = mongoose.model('Experience')
var User = mongoose.model('User')
var uuid = require('uuid')

exports.new = function *(next){

  // console.log(this.request);
  // console.log(this.request.query);
  console.log(this.request.body);
  let user = new User({_id:1, name:"hello"});
  console.log(user.name);
  let res = this.request.body;
  var experience = new Position({
    text: res.text,
    type: res.type,
    _creator:"58c29abba16c62210b3a0a5f"
  });

  try {
    //console.log(user.toString());
    position = yield position.save();
    this.body = position
  } catch (e) {
    this.body = {
    success: false
    }
  }
  return next
}

exports.list = function *(next){
  try {
    let positions = yield Position.find().populate("_creator","name")


    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody:positions
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
    let position = yield Position
    .find({_id:"58d1266ed7a3413d50a67eb1"})
    .populate("_creator")
    this.body = position
    return next
}
exports.destroy = function *(next){
  console.log(this.request.query);

    console.log(this.params);
    let users = yield User.find({_id:this.params.id})
    this.body = users
    return next
}

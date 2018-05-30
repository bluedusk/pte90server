'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var User = mongoose.model('User')
var uuid = require('uuid')




// validate token for api calls
exports.validToken = function *(next){

  try {
    
    var decoded = yield User.findByToken(this.request.header['x-auth']);

  } catch (error) {
    
    this.status = 401;
    this.body = {
      success: false,
      err: error,
      errMsg: this.response
    }

    return next;
  }
   yield next;
}


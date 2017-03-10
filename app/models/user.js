'use strict'

var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name: String,
  accessToken: String,
  points: Number

})


module.exports = mongoose.model('User', UserSchema)

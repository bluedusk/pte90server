'use strict'

var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name: String,
  accessToken: String
})


module.exports = mongoose.model('User', UserSchema)

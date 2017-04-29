'use strict'

var mongoose = require('mongoose')

// user & testedItems
var UserTestedItemSchema = new mongoose.Schema({
  userId: String,
  itemId: String,
  time: String
})


module.exports = mongoose.model('UserTestedItem', UserTestedItemSchema)

'use strict'

var mongoose = require('mongoose')

var ExpSchema = new mongoose.Schema({
  text: String,
  type: Number,
  updatedAt: { type: Date, default: Date.now },
  _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})


module.exports = mongoose.model('Experience', ExpSchema)

'use strict'

var mongoose = require('mongoose')

var PositionSchema = new mongoose.Schema({
  text: String,
  type: Number,
  updated: { type: Date, default: Date.now },
  _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})


module.exports = mongoose.model('Position', PositionSchema)

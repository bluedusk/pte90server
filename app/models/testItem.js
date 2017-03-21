'use strict'

var mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  itemType: String,
  itemText: String,
  topic: String,
  tested: Number,
  answer: String,
  essaySample: [],
  imageSrc: String,
  imageType: String,
  itemId: String,
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  official: Boolean

})


module.exports = mongoose.model('TestItem', ItemSchema)

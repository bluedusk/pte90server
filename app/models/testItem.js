'use strict'

var mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  itemType: String,
  itemText: String,
  topic: String,
  tested: Number,
  answer: String,
  essaySample: String,
  imageSrc: String,
  imageType: String,
  itemId: String,
  contributor: String

})


module.exports = mongoose.model('TestItem', ItemSchema)

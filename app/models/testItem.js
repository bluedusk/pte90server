'use strict'

var mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  type: String,
  itemType: String,
  itemText: String,
  topic: String,
  tested: Number,
  accessToken: String,
  answer: String,
  essaySample: String,
  imageSrc: String,
  ImageType: String,
  ItemId: String,

})


module.exports = mongoose.model('TestItem', ItemSchema)

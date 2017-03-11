'use strict'
'use strict'
'use strict'
'use strict'
'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
var TestItem = mongoose.model('TestItem')
var uuid = require('uuid')

exports.new = function *(next){

  console.log(this.request);
  console.log(this.request.query);
  console.log(this.request.body.itemText);
  let res = this.request.body;
  // var item = new TestItem({
  //   itemType: 'sst',
  //   itemText: 'text',
  //   topic: '',
  //   tested: 234,
  //   answer: 'answer',
  //   essaySample: 'essaySample',
  //   imageSrc: 'imageSrc',
  //   ImageType: 'pie',
  //   ItemId: uuid.v4()
  // });
  var item = new TestItem();
  item.itemText = res.itemText;
  item.itemType = res.itemType;
  item.topic = res.topic;
  item.tested = res.tested;
  item.answer = res.answer;
  item.essaySample = res.essaySample;
  item.imageSrc = res.imageSrc;
  item.imageType = res.imageType;
  item.contributor = res.contributor;
  item.itemId = uuid.v4();
  try {
    //console.log(item.toString());
    item = yield item.save();
    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody:item
      }  } catch (e) {
    this.body = {
    success: false
    }
  }
  return next
}

exports.list = function *(next){
  console.log(this.request.query);

  let type = this.params.type;
  let filter = !type ? {} : {itemType:type};
  let userFilter = this.request.query.contributor;
  if(userFilter){
    filter.contributor = userFilter;
    if(userFilter == 'user'){
      // if data contains contributor and not equal to ''
      filter.contributor = {$exists:true,$ne:""};
    }
  }

  console.log(type);
  try {
    let items = yield TestItem.find(filter)
    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody:items
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
    let users = yield User.find({_id:"58b523c3ef8312ab91fef301"})
    this.body = users
    return next
}
exports.destroy = function *(next){
    let id = this.params.id;
    console.log(id);
    try {
      let item = yield TestItem.remove({itemId:id})
      this.body = {
        resCode: '0000',
        resMsg: 'success',
        resBody:item
        }
    } catch (e) {
      this.body = {
        resCode: '9999',
        resMsg: 'remove item failed.',
        resBody:item
        }
    }
    return next
}

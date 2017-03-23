'use strict'

// var xss = require('xss')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var TestItem = mongoose.model('TestItem')
var UserTestedItem = mongoose.model('UserTestedItem')
var uuid = require('uuid')
var _ = require('lodash');

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
  let item = new TestItem();
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
  item.official = res.official;
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
  let {official,contributor,queryid} = this.request.query;

  if (official) {
    filter.official = official;
  }
  if(contributor){
    // my items
    if (contributor !== 'user') {
      filter.contributor = contributor;
    }
    // discover items
    // if(userFilter == 'user'){
    //   // if data contains contributor and not equal to ''
    //   filter.contributor = {$exists:true,$ne:""};
    // }
  }
  if(queryid){

  }

  console.log(filter);
  try {
    // TODO Performance
    // all items filter by type & user
    let items = yield TestItem.find(filter).populate("contributor","name")
    // all items current user have tested
    let testedItems = yield UserTestedItem.find({userId:queryid})

    console.log(testedItems);

    let result = [];
    items.forEach((item) =>{
        // console.log(item);
        // TODO must set value to ._doc when modify
        item._doc.active = false;
        //console.dir(item);

        if(_.find(testedItems,{itemId:item.itemId})){
          item._doc.active = true;
        }

        //result.push(item);
      }
    )

    //console.log(result);


    this.body = {
      resCode: '0000',
      resMsg: 'success',
      resBody: items
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

// tested ++
exports.testedNew = function *(next){
    let res = this.request.body;
    console.log(res);
    var testedItem = new UserTestedItem();
    testedItem.userId = res.userId;
    testedItem.itemId = res.itemId;

    try {

      // TODO move to router
      // how to ensure transaction
      let item = yield testedItem.save();
      let res2 = yield TestItem.update(
        {itemId:res.itemId},
        { $inc: { tested: 1 } }
      );
      this.body = {
        resCode: '0000',
        resMsg: 'add testedItem success',
        resBody:item
        }
    } catch (e) {
      console.log(e);
      this.body = {
        resCode: '9999',
        resMsg: 'add testedItem failed.',
        resBody:e
        }
    }
    return next
}
// tested --
exports.testedDestroy = function *(next){
    let res = this.request.body;
    console.log(res);
    // let testedItem = new UserTestedItem();
    //
    // testedItem.userId = res.userId;
    // testedItem.itemId = res.itemId;

    try {
      let res1 = yield UserTestedItem.remove({userId:res.userId,itemId:res.itemId});
      // console.log(res1);
      let res2 = yield TestItem.update(
        {itemId:res.itemId},
        { $inc: { tested: -1 } }
      );
      console.log(res2);

      this.body = {
        resCode: '0000',
        resMsg: 'add testedItem success',
        resBody:[res1,res2]
        }
    } catch (e) {
      console.log(e);
      this.body = {
        resCode: '9999',
        resMsg: 'remove testedItem failed.',
        resBody:e
        }
    }
    return next
}

const Koa = require('koa');
const app = new Koa();
var mongoose = require('mongoose');
var User = require('./app/models/user');

mongoose.Promise = require('bluebird')
var db = mongoose.connect('mongodb://127.0.0.1:27017/db');

db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

db.connection.on("open", function () {
  console.log("数据库连接成功");
});
var logger = require('koa-logger');

app.use(logger());


var router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())


app.use(ctx => {
  ctx.body = 'Hello World';
});



var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });

kitty.save(function (err) {
  if (err) {
    console.log('save error:' + err);
  }
  console.log('save sucess');
});


app.listen(3333);
console.log('Listening: 3333')

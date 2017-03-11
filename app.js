const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var TestItem = require('./app/models/testItem');

// Database Connetion
mongoose.Promise = require('bluebird')
mongoose.set('debug', true);

var db = mongoose.connect('mongodb://127.0.0.1:27017/db');

db.connection.on("error", function (error) {
  console.log("db connect failed." + error);
});

db.connection.on("open", function () {
  console.log("db connect done");
});

// Logger
var logger = require('koa-logger');
app.use(logger());

// bodyparser, must before router
var bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// Router
var router = require('./config/routes')()

app
  .use(convert(router.routes()))
  .use(convert(router.allowedMethods()))

// Error
// app.on('error', function(err){
//   Log.error('server error', err)
// })




// app.use(ctx => {
//   ctx.body = 'Hello World';
// });


// var Cat = mongoose.model('Cat', { name: String });
// var kitty = new Cat({ name: 'Zildjian' });
//
// kitty.save(function (err) {
//   if (err) {
//     console.log('save error:' + err);
//   }
//   console.log('save sucess');
// });


app.listen(3333);
console.log('Listening: 3333')

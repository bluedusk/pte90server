'use strict'

var Router = require('koa-router')
var UserController = require('../app/controllers/userController')


module.exports = function() {
  var router = new Router({
    prefix: '/api'
  })

  // user
  router.get('/u/signup', UserController.signup)


  return router
}

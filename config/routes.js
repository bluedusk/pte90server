'use strict'

var Router = require('koa-router')
var UserController = require('../app/controllers/userController')
var ItemController = require('../app/controllers/itemController')


module.exports = function() {
  var router = new Router({
    prefix: '/api'
  })

  /**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /locations[/]        => location.list()
 *  GET    /locations/new       => location.new()
 *  GET    /locations/:id       => location.show()
 *  GET    /locations/:id/edit  => location.edit()
 *  POST   /locations[/]        => location.create()
 *  PATCH  /locations/:id       => location.update()
 *  DELETE /locations/:id       => location.destroy()
 *
 */

  // user
  router.post('/u/new', UserController.new)

  router.get('/u/users', UserController.list)
  router.get('/u/user/:id', UserController.show)

  router.get('/items', ItemController.list)


 // items

  return router
}

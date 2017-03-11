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
  router.post('/users', UserController.new)
  router.get('/users', UserController.list)
  router.get('/users/:id', UserController.show)
  // router.patch('/user/:id', UserController.update)



 // items
 router.get('/items', ItemController.list)
 router.get('/items/:type', ItemController.list)
 router.post('/items', ItemController.new)
 router.delete('/items/:id', ItemController.destroy)
 // router.patch('/items/:id', ItemController.update)

 // position
 router.get('/positions', ItemController.list)
 router.post('/positions', ItemController.new)

 // experience
 router.get('/experiences', ItemController.list)
 router.post('/experiences', ItemController.new)


  return router
}

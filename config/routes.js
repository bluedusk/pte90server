'use strict'

var Router = require('koa-router')
var AppController = require('../app/controllers/appController')
var UserController = require('../app/controllers/userController')
var ItemController = require('../app/controllers/itemController')
var PositionController = require('../app/controllers/positionController')
var ExpController = require('../app/controllers/expController')


module.exports = function () {
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


  // app


  // user
  router.post('/users', UserController.new);
  router.post('/login', UserController.login);
  // router.get('/users', AppController.validToken,UserController.list)
  router.get('/users', UserController.list);
  router.get('/users/:id', UserController.show);
  router.patch('/users', UserController.update);



  // items
  router.get('/items', ItemController.list)
  router.get('/items/:type', ItemController.list)
  router.post('/items', ItemController.new)
  router.delete('/items/:id', ItemController.destroy)
  // router.patch('/items/:id', ItemController.update)

  // useritems: user&items reference table
  router.post('/tested', ItemController.testedNew)
  router.patch('/tested', ItemController.testedDestroy)
  // router.patch('/items/:id', ItemController.update)

  // position
  router.get('/positions', PositionController.list)
  router.post('/positions', PositionController.new)
  router.delete('/positions/:id', PositionController.destroy)
  router.get('/positions/:id', PositionController.show)

  // experiences
  router.get('/experiences', ExpController.list)
  router.post('/experiences', ExpController.new)
  router.delete('/experiences/:id', ExpController.destroy)
  router.get('/experiences/:id', ExpController.show)


  return router
}

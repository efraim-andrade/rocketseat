const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')

const routes = express.Router()

routes.post('/users',
  validate(validators.User),
  handle(controllers.UserController.store))
routes.post('/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store))

routes.use(authMiddleware)

/**
 * Ads
 */

routes.get('/ads/', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))
routes.post('/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store))
routes.put('/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update))

/**
 * Purchases
 */

routes.post('/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store))

routes.put('/purchases/:id',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.update))

module.exports = routes

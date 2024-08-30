/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')
const ImagesController = () => import('#controllers/images_controller')
const MenusController = () => import('#controllers/menus_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })
    router.post('signin', [AuthController, 'signin'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
    router.resource('users', UsersController).apiOnly().use('*', middleware.auth())
    router
      .resource('recipes', RecipesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())
    router
      .resource('images', ImagesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())
    router.resource('menus', MenusController).apiOnly().use('*', middleware.auth())
    router
      .group(() => {
        router.post('like/:id', [RecipesController, 'addFavorites'])
        router.post('unlike/:id', [RecipesController, 'removeFavorites'])
      })
      .use(middleware.auth())
      .prefix('recipes')
  })
  .prefix('api/v1/')

import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ auth }: HttpContext) {
    console.log('🚀 ~ UsersController ~ index ~ auth:', auth.isAuthenticated, auth.user)
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
}

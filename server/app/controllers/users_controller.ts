import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    if (!users) return response.notFound({ message: 'Users not found' })
    return response.ok({ users: users.sort((a: User, b: User) => a.id - b.id) })
  }

  async show({ response, params }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })
    return response.ok({ user: user.toJSON() })
  }

  async store({ response }: HttpContext) {
    return response.ok({ message: 'Store User' })
  }

  async update({ request, response, auth, params }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'Invalid request' })
    if (auth.user?.id !== user.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })
    const userBody = request.only(['firstname', 'lastname', 'email', 'password'])
    if (userBody) {
      // validate the body
      if (userBody.password) user.password = userBody.password
      if (userBody.email) user.email = userBody.email
      if (userBody.firstname) user.firstname = userBody.firstname
      if (userBody.lastname) user.lastname = userBody.lastname
      await user.save()
      return response.ok({ message: 'User successfully updated', user: user.toJSON() })
    } else {
      return response.badRequest({ message: 'Missing body' })
    }
  }

  async destroy({ request, response, params, auth }: HttpContext) {
    console.log('🚀 ~ RecipesController ~ destroy ~ request:', request)
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'Invalid request' })
    if (auth.user?.id !== user.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })
    await user.delete()
    return response.ok({ message: 'User successfully deleted' })
  }
}

import User from '#models/user'
import { userPayloadValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.query().preload('favoriteRecipes')
    if (!users) return response.notFound({ message: 'Users not found' })
    return response.ok({ users: users.sort((a: User, b: User) => a.id - b.id) })
  }

  async show({ response, params }: HttpContext) {
    const user = await User.query().preload('favoriteRecipes').where('id', params.id)
    if (!user) return response.notFound({ message: 'User not found' })
    return response.ok({ user: user })
  }

  async store({ response }: HttpContext) {
    return response.ok({ message: 'Store User' })
  }

  async update({ request, response, auth, params }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'Invalid request' })
    if (auth.user?.id !== user.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const arrayOfAcceptedInputs = ['firstname', 'lastname', 'email', 'password']
    const payloadHasAcceptedInputs = arrayOfAcceptedInputs.some(
      (key: string) => key in request.body()
    )
    if (false === payloadHasAcceptedInputs)
      return response.badRequest({ message: 'Missing body parameters' })
    const userBody = request.only(arrayOfAcceptedInputs)
    const payload = await request.validateUsing(userPayloadValidator)

    if (userBody.password) user.password = payload.password as string
    if (userBody.email) user.email = payload.email as string
    if (userBody.firstname) user.firstname = payload.firstname as string
    if (userBody.lastname) user.lastname = payload.lastname as string
    await user.save()
    return response.ok({ message: 'User successfully updated', user: user.toJSON() })
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

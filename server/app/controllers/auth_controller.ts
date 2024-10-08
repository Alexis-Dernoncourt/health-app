import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async signin({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const newUser = await User.create(payload)
    return response.created(newUser)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['user:normal'], {
      name: 'access-token',
      expiresIn: '7 days',
    })

    return response.ok({
      token: token,
      user: user.serialize(),
    })
  }
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }
}

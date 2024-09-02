import User from '#models/user'
import { uploadImageValidator, userPayloadValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.query()
      .preload('image', (image) => image.select('id', 'url'))
      .preload('favoriteRecipes', (recipeQuery) => {
        recipeQuery.preload('image')
      })
    if (!users) return response.notFound({ message: 'Users not found' })
    return response.ok({ users: users.sort((a: User, b: User) => a.id - b.id) })
  }

  async show({ response, params }: HttpContext) {
    const user = await User.query()
      .preload('image', (image) => image.select('id', 'url'))
      .preload('favoriteRecipes', (recipeQuery) => {
        recipeQuery.preload('image')
      })
      .where('id', params.id)
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

  async imageUpload({ request, response, params, auth }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'Invalid request' })
    if (auth.user?.id !== user.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const payload = await request.validateUsing(uploadImageValidator)
    if (!payload.image) return response.badRequest('Image not uploaded')
    if (payload.image.hasErrors) {
      return response.badRequest(payload.image.errors)
    }

    const existingImage = await User.query().preload('image').where('id', user.id)
    const disk = drive.use('fs')

    if (existingImage[0].image.url && (await disk.exists(existingImage[0].image.url))) {
      const fileInStorage = await disk.getUrl(existingImage[0].image.url)
      await disk.delete(fileInStorage.split('/storage/')[1])
    }

    const name = `/uploads/users/${cuid()}.${payload.image.extname}`
    await payload.image.moveToDisk(name)
    await user.related('image').updateOrCreate({ userId: user.id }, { url: name })
    return response.ok({
      message: 'Image successfully uploaded',
      url: await drive.use().getUrl(name),
    })
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

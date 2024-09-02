import Image from '#models/image'
import type { HttpContext } from '@adonisjs/core/http'

export default class ImagesController {
  async index({ response }: HttpContext) {
    const images = await Image.all()
    if (!images) return response.notFound({ message: 'Recipes not found' })
    return response.ok({
      images: images,
    })
  }

  async show({ params, response }: HttpContext) {
    const image = await Image.find(params.id)
    if (!image) return response.notFound({ message: 'Recipe not found' })
    return response.ok({ image: image })
  }
}

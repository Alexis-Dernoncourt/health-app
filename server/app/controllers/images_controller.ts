import type { HttpContext } from '@adonisjs/core/http'

export default class ImagesController {
  async index({ response }: HttpContext) {
    return response.ok('Hello from Image Controller')
  }
}

import Menu from '#models/menu'
import { storeMenuValidator } from '#validators/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class MenusController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const menus = await Menu.all()
    if (!menus || menus.length === 0) return response.notFound({ message: 'No menu found' })
    return response.ok({ menus: menus })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const requestPayload = await request.validateUsing(storeMenuValidator)
    const user = auth.getUserOrFail().id
    const payload = { user, ...requestPayload }
    await Menu.create(payload)
    return response.created({ message: 'Menu created !' })
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail().id
    const menu = await Menu.query().where({ user, id: params.id }).first()
    if (!menu) return response.notFound({ message: 'Menu not found' })
    return response.ok({ menu })
  }

  /**
   * Handle form submission for the edit action
   */
  // TODO: add this update method
  //   async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail().id
    const menu = await Menu.query().where({ user, id: params.id }).first()
    if (!menu) return response.notFound({ message: 'Menu not found' })
    await menu.delete()
    return response.ok({ message: 'Menu entry deleted' })
  }
}

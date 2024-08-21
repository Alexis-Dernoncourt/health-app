import Menu from '#models/menu'
import { storeMenuValidator, updateMenuValidator } from '#validators/menu'
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
  async update({ params, auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail().id
    const menu = await Menu.query().where({ user, id: params.id }).first()
    if (!menu || menu.user !== user) return response.notFound({ message: 'Menu not found' })
    const requestPayload = await request.validateUsing(updateMenuValidator)
    if (!Object.keys(requestPayload).length)
      return response.badRequest({ message: 'No data to update or bad payload' })
    menu.merge(requestPayload, false)
    await menu.save()
    return response.ok({ message: 'Menu updated !', requestPayload: requestPayload })
  }

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

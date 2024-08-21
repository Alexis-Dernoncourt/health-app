import factory from '@adonisjs/lucid/factories'
import Menu from '#models/menu'

export const MenuFactory = factory
  .define(Menu, async ({ faker }) => {
    return {}
  })
  .build()
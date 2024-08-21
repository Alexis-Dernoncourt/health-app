import vine from '@vinejs/vine'

export const storeMenuValidator = vine.compile(
  vine.object({
    recipe: vine.number().positive(),
    meal: vine.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']),
    date: vine.date(),
  })
)

export const updateMenuValidator = vine.compile(
  vine.object({
    recipe: vine.number().positive().optional(),
    meal: vine.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).optional(),
    date: vine.date().optional(),
  })
)

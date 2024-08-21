import vine from '@vinejs/vine'

const ingredientsSchema = vine.object({
  name: vine.string().minLength(3).maxLength(128),
  quantity: vine.number().positive(),
  unit: vine.string().minLength(1).maxLength(64).optional(),
})
const stepsSchema = vine.object({
  number: vine.number().positive().optional(),
  text: vine.string().minLength(3),
  warning: vine.string().minLength(3).maxLength(128).optional(),
})

export const storeRecipeValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(254),
    description: vine.string().minLength(3),
    image: vine.number().positive().optional(),
    ingredients: vine.array(ingredientsSchema),
    steps: vine.array(stepsSchema).optional(),
    calories: vine
      .object({
        for100gr: vine.number().positive(),
        total: vine.number().positive(),
        totalWeight: vine.number().positive(),
        caloriesUnit: vine.string().minLength(1).maxLength(32).optional(),
      })
      .optional(),
  })
)

export const updateRecipeValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(254).optional(),
    description: vine.string().minLength(3).optional(),
    image: vine.number().positive().optional(),
    ingredients: vine.array(ingredientsSchema).optional(),
    steps: vine.array(stepsSchema).optional(),
    calories: vine
      .object({
        for100gr: vine.number().positive(),
        total: vine.number().positive(),
        totalWeight: vine.number().positive(),
        caloriesUnit: vine.string().minLength(1).maxLength(32).optional(),
      })
      .optional(),
  })
)

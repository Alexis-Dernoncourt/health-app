import vine from '@vinejs/vine'

export const userPayloadValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(64).optional(),
    lastname: vine.string().minLength(3).maxLength(64).optional(),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      })
      .optional(),
    password: vine.string().minLength(12).maxLength(128).optional(),
  })
)

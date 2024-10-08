import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(64),
    lastname: vine.string().minLength(3).maxLength(64).optional(),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(12).maxLength(128),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(12).maxLength(128),
  })
)

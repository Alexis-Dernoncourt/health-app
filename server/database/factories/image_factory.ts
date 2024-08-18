import factory from '@adonisjs/lucid/factories'
import Image from '#models/image'

export const UserImageFactory = factory
  .define(Image, async ({ faker }) => {
    return {
      url: faker.image.urlLoremFlickr({ category: 'people' }),
    }
  })
  .build()

export const RecipeImageFactory = factory
  .define(Image, async ({ faker }) => {
    return {
      url: faker.image.urlLoremFlickr({ category: 'recipes' }),
    }
  })
  .build()

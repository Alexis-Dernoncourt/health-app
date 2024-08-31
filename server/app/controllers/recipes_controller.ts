import { RecipeImageFactory } from '#database/factories/image_factory'
import Image from '#models/image'
import Recipe from '#models/recipe'
import { storeRecipeValidator, updateRecipeValidator } from '#validators/recipe'
import type { HttpContext } from '@adonisjs/core/http'

export default class RecipesController {
  async index({ response }: HttpContext) {
    const recipes = await Recipe.query().preload('image')
    if (!recipes) return response.notFound({ message: 'Recipes not found' })
    return response.ok({ recipes: recipes })
  }

  async show({ params, response }: HttpContext) {
    const recipe = await Recipe.query().preload('image').where('id', params.id).first()
    if (!recipe) return response.notFound({ message: 'Recipe not found' })
    return response.ok({ recipe: recipe })
  }

  async store({ request, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const bodyRecipe = await request.validateUsing(storeRecipeValidator)
    const newIngredients = JSON.stringify(request.input('ingredients'))
    const newSteps = JSON.stringify(request.input('steps'))
    const newRecipe = {
      ...bodyRecipe,
      ingredients: newIngredients,
      steps: newSteps,
    }
    const recipe = new Recipe().fill(newRecipe)
    const image = await RecipeImageFactory.make()
    await recipe.related('image').create({ url: image.url })
    await recipe.save()
    return response.ok({ message: 'Recipe created !', recipe: recipe.toJSON() })
  }

  async update({ request, response, params, auth }: HttpContext) {
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Invalid request' })

    // TODO: check if user is admin OR recipe author ID is the same user
    const currentUser = auth.getUserOrFail()
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    // TODO: add recipe image
    const arrayOfAcceptedInputs = ['title', 'description', 'ingredients', 'steps', 'calories']
    const payloadHasAcceptedInputs = arrayOfAcceptedInputs.some(
      (key: string) => key in request.body()
    )
    if (false === payloadHasAcceptedInputs)
      return response.badRequest({ message: 'Missing body parameters' })
    const bodyRecipe = request.only(arrayOfAcceptedInputs)
    const payload = await request.validateUsing(updateRecipeValidator)

    if (bodyRecipe) {
      // TODO: validate the body
      if (bodyRecipe.title) recipe.title = payload.title as string
      if (bodyRecipe.description) recipe.description = payload.description as string
      if (bodyRecipe.image) {
        await Image.create({ url: payload.image })
        recipe.related('image')
      }
      if (bodyRecipe.ingredients) recipe.ingredients = JSON.stringify(payload.ingredients)
      if (bodyRecipe.steps) recipe.steps = JSON.stringify(payload.steps)
      if (bodyRecipe.calories) recipe.calories = bodyRecipe.calories
      await recipe.save()
      return response.ok({ message: 'Recipe successfully updated' })
    } else {
      return response.badRequest({ message: 'Missing body' })
    }
  }

  async addFavorites({ params, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Recipe not found' })
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const favExist = await currentUser
      .related('favoriteRecipes')
      .query()
      .where('recipe_id', params.id)
      .where('user_id', currentUser.id)
      .first()
    if (favExist) return response.badRequest({ message: 'Recipe already in favorites' })

    // Add the recipe to the user's favorites
    await currentUser.related('favoriteRecipes').attach([recipe.id])
    return response.ok({ message: 'Recipe successfully added to favorites' })
  }

  async removeFavorites({ params, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Recipe not found' })
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const favExist = await currentUser
      .related('favoriteRecipes')
      .query()
      .where('recipe_id', params.id)
      .where('user_id', currentUser.id)
      .first()
    if (!favExist) return response.notFound({ message: 'Recipe not found in favorites' })

    // Remove the recipe from the user's favorites
    await currentUser.related('favoriteRecipes').detach([recipe.id])
    return response.ok({ message: 'Recipe successfully removed from favorites' })
  }

  async destroy({ params, response }: HttpContext) {
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Invalid request' })
    //TODO: check if user is admin OR recipe author ID is the same user
    // if (auth.user?.role !== "admin")
    //   return response.forbidden({ message: "You don't have permission to perform this action" })
    await recipe.delete()
    return response.ok({ message: 'Recipe successfully deleted' })
  }
}

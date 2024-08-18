import { RecipeImageFactory } from '#database/factories/image_factory'
import Recipe from '#models/recipe'
import type { HttpContext } from '@adonisjs/core/http'

export default class RecipesController {
  async index({ response }: HttpContext) {
    const recipes = await Recipe.all()
    if (!recipes) return response.notFound({ message: 'Recipes not found' })
    return response.ok({ recipes: recipes.sort((a: Recipe, b: Recipe) => a.id - b.id) })
  }

  async show({ params, response }: HttpContext) {
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Recipe not found' })
    return response.ok({ recipe: recipe.toJSON() })
  }

  async store({ request, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    // TODO: validate the body
    const bodyRecipe = request.body()
    const newIngredients = JSON.stringify(bodyRecipe.ingredients)
    const newSteps = JSON.stringify(bodyRecipe.steps)
    const image = await RecipeImageFactory.create()
    console.log('🚀 ~ RecipesController ~ store ~ image:', image.id)
    const newRecipe = {
      ...bodyRecipe,
      image: image.id,
      ingredients: newIngredients,
      steps: newSteps,
    }
    const recipe = await Recipe.create(newRecipe)
    return response.ok({ message: 'Recipe created !', recipe: recipe.toJSON() })
  }

  async update({ request, response, params, auth }: HttpContext) {
    const recipe = await Recipe.find(params.id)
    if (!recipe) return response.notFound({ message: 'Invalid request' })

    // TODO: check if user is admin OR recipe author ID is the same user
    const currentUser = auth.getUserOrFail()
    if (auth.user?.id !== currentUser.id)
      return response.forbidden({ message: "You don't have permission to perform this action" })

    const bodyRecipe = request.body()
    if (bodyRecipe) {
      // TODO: validate the body
      if (bodyRecipe.title) recipe.title = bodyRecipe.title
      if (bodyRecipe.description) recipe.description = bodyRecipe.description
      if (bodyRecipe.image) recipe.image = bodyRecipe.image
      if (bodyRecipe.ingredients) recipe.ingredients = JSON.stringify(bodyRecipe.ingredients)
      if (bodyRecipe.steps) recipe.steps = JSON.stringify(bodyRecipe.steps)
      if (bodyRecipe.calories) recipe.calories = bodyRecipe.calories
      await recipe.save()
      return response.ok({ message: 'Recipe successfully updated' })
    } else {
      return response.badRequest({ message: 'Missing body' })
    }
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

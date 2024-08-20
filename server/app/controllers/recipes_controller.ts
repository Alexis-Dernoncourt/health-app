import { RecipeImageFactory } from '#database/factories/image_factory'
import Recipe from '#models/recipe'
import { storeRecipeValidator, updateRecipeValidator } from '#validators/recipe'
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

    const bodyRecipe = await request.validateUsing(storeRecipeValidator)
    // const bodyRecipe = request.body()
    const newIngredients = JSON.stringify(request.input('ingredients'))
    const newSteps = JSON.stringify(request.input('steps'))
    const image = await RecipeImageFactory.create()
    const newRecipe = {
      ...bodyRecipe,
      image: image.id,
      ingredients: newIngredients,
      steps: newSteps,
    } as Recipe
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
      if (bodyRecipe.image) recipe.image = payload.image as number
      if (bodyRecipe.ingredients) recipe.ingredients = JSON.stringify(payload.ingredients)
      if (bodyRecipe.steps) recipe.steps = JSON.stringify(payload.steps)
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

import { EntityManager } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { Recipes } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Users } from 'src/users/entities/user.entity';
import { UserFavorites } from './entities/FavoritedRecipe.entity';

@Injectable()
export class RecipesService {
  constructor(private readonly em: EntityManager) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipes> {
    try {
      const newIngredients = JSON.stringify(createRecipeDto.ingredients);
      const newSteps = JSON.stringify(createRecipeDto.steps);
      const newRecipe = {
        ...createRecipeDto,
        ingredients: newIngredients,
        steps: newSteps,
      };
      const recipe = this.em.create(
        Recipes,
        { ...newRecipe },
        { partial: true },
      );
      await this.em.persistAndFlush(recipe);
      return recipe;
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create the recipe", 409);
    }
  }

  async findAll(): Promise<any> {
    return await this.em.findAll(Recipes);
  }

  async findOne(id: string) {
    try {
      return await this.em.findOneOrFail(Recipes, { id });
    } catch (error) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      await this.em.findOneOrFail(Recipes, { id });
      const updatedRecipe = updateRecipeDto;
      // eslint-disable-next-line prefer-const
      let formatedRecipe: any = updatedRecipe;
      if (updateRecipeDto.ingredients) {
        const newIngredients = JSON.stringify(updateRecipeDto.ingredients);
        formatedRecipe.ingredients = newIngredients;
      }
      if (updateRecipeDto.steps) {
        const newSteps = JSON.stringify(updateRecipeDto.steps);
        formatedRecipe.steps = newSteps;
      }
      try {
        await this.em.nativeUpdate(Recipes, id, { ...formatedRecipe });
      } catch (error) {
        console.log('🚀 ~ RecipeService ~ update ~ error:', error);
        throw new Error("Can't update the recipe");
      }
    } catch (error) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException(error.message ?? "Can't found this recipe", 400);
    }
    return `The #${id} recipe was updated`;
  }

  async remove(id: string) {
    try {
      const recipe = await this.em.findOneOrFail(Recipes, { id });
      this.em.removeAndFlush(recipe);
      return `The #${id} recipe was deleted`;
    } catch (error) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this recipe", 400);
    }
  }

  async addFavoriteRecipe(recipeId: string, userId: string): Promise<void> {
    const user = await this.em.findOneOrFail(Users, { id: userId });
    const recipe = await this.em.findOneOrFail(Recipes, recipeId);

    try {
      user.favorites.add(recipe);
      await this.em.persistAndFlush(user);
    } catch (error) {
      console.log('🚀 ~ RecipesService ~ addFavoriteRecipe ~ error:', error);
      throw new HttpException("Can't add this recipe to favorites", 400);
    }
  }

  async removeFavoriteRecipe(recipeId: string, userId: string): Promise<void> {
    try {
      const favoriteRecipe = await this.em.findOneOrFail(UserFavorites, {
        user: { id: userId },
        recipe: { id: recipeId },
      });
      await this.em.nativeDelete(UserFavorites, {
        id: favoriteRecipe.id,
        user: { id: userId },
        recipe: { id: recipeId },
      });
    } catch (error) {
      console.log('🚀 ~ RecipesService ~ removeFavoriteRecipe ~ error:', error);
      throw new HttpException("Can't remove this recipe from favorites", 400);
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma.service';
import { recipes } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<recipes> {
    try {
      const newIngredients = JSON.stringify(createRecipeDto.ingredients);
      const newSteps = JSON.stringify(createRecipeDto.steps);
      const newRecipe = {
        ...createRecipeDto,
        ingredients: newIngredients,
        steps: newSteps,
      };
      const recipe = await this.prisma.recipes.create({
        data: { ...newRecipe },
      });
      return recipe;
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create the recipe", 409);
    }
  }

  async findAll(): Promise<any> {
    return await this.prisma.recipes.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.recipes.findFirstOrThrow({ where: { id } });
    } catch (error) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      await this.prisma.recipes.findFirstOrThrow({ where: { id } });
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
        await this.prisma.recipes.update({
          where: { id },
          data: { ...formatedRecipe },
        });
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
      const recipe = await this.prisma.recipes.delete({ where: { id } });
      console.log('🚀 ~ RecipesService ~ remove ~ recipe:', recipe);
      return `The #${id} recipe was deleted`;
    } catch (error) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this recipe", 400);
    }
  }

  async addFavoriteRecipe(recipeId: string, userId: string): Promise<void> {
    const user = await this.prisma.users.findFirstOrThrow({
      where: { id: userId },
    });
    console.log('🚀 ~ RecipesService ~ addFavoriteRecipe ~ user:', user);
    const recipe = await this.prisma.recipes.findFirstOrThrow({
      where: { id: recipeId },
    });
    console.log('🚀 ~ RecipesService ~ addFavoriteRecipe ~ recipe:', recipe);

    try {
      await this.prisma.users.update({
        where: { id: userId },
        data: {
          favorites: {
            connect: {
              id: recipeId,
            },
          },
        },
      });
    } catch (error) {
      console.log('🚀 ~ RecipesService ~ addFavoriteRecipe ~ error:', error);
      throw new HttpException("Can't add this recipe to favorites", 400);
    }
  }

  async removeFavoriteRecipe(recipeId: string, userId: string): Promise<void> {
    try {
      const favoriteRecipe = await this.prisma.user_favorites.findFirstOrThrow({
        where: {
          user_id: userId as any,
          recipe_id: recipeId as any,
        },
      });
      await this.prisma.user_favorites.delete({
        where: {
          id: favoriteRecipe.id,
        },
      });
    } catch (error) {
      console.log('🚀 ~ RecipesService ~ removeFavoriteRecipe ~ error:', error);
      throw new HttpException("Can't remove this recipe from favorites", 400);
    }
  }
}

import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
import { PrismaService } from 'src/prisma.service';
import { recipes } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class RecipesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = await this.prisma.recipes.create({
        data: createRecipeDto,
      });
      return recipe;
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create the recipe", 409);
    }
  }

  async findAll() {
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

  async update(
    id: string,
    image: Express.Multer.File,
    updateRecipeDto: UpdateRecipeDto,
  ) {
    try {
      await this.prisma.recipes.findFirstOrThrow({ where: { id } });
      const updatedRecipe = updateRecipeDto;
      // eslint-disable-next-line prefer-const
      let filteredRecipe: Partial<recipes> = updatedRecipe;
      if (image) {
        const uploadResult = await this.cloudinary.uploadFile(
          image,
          `recipes`,
          id,
        );
        filteredRecipe.image = uploadResult?.secure_url ?? null;
      }
      if (updateRecipeDto.ingredients) {
        filteredRecipe.ingredients = updateRecipeDto.ingredients;
      }
      if (updateRecipeDto.steps) {
        filteredRecipe.steps = updateRecipeDto.steps;
      }
      try {
        await this.prisma.recipes.update({
          where: { id },
          data: { ...filteredRecipe },
        });
      } catch (error) {
        console.log('🚀 ~ RecipeService ~ update ~ error:', error);
        throw new Error("Can't update the recipe");
      }
    } catch (error: any) {
      console.log('🚀 ~ RecipeService ~ findOne ~ error:', error);
      throw new HttpException(error.message ?? "Can't found this recipe", 400);
    }
    return `The #${id} recipe was updated`;
  }

  async deleteImage(id: string, prefix: string) {
    try {
      await this.cloudinary.deleteImage(prefix + id);
      const updatedUser = await this.prisma.recipes.update({
        where: { id },
        data: {
          image: null,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ addImage ~ error:', error);
      throw new BadRequestException("Can't remove recipe image");
    }
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
      const existingFavoriteRecipe = await this.prisma.user_favorites.findFirst(
        {
          where: {
            user_id: user.id,
            recipe_id: recipeId,
          },
        },
      );
      if (existingFavoriteRecipe) {
        throw new BadRequestException('Recipe already added to favorites');
      }

      await this.prisma.user_favorites.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          recipe: {
            connect: {
              id: recipe.id,
            },
          },
        },
      });
    } catch (error) {
      console.log('🚀 ~ RecipesService ~ addFavoriteRecipe ~ error:', error);
      throw (
        error || new HttpException("Can't add this recipe to favorites", 400)
      );
    }
  }

  async removeFavoriteRecipe(recipeId: string, userId: string): Promise<void> {
    try {
      const favoriteRecipe = await this.prisma.user_favorites.findFirstOrThrow({
        where: {
          user_id: userId,
          recipe_id: recipeId,
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

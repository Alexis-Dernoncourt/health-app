import { recipeApi } from '../api/recipeApi';
import { Recipe } from '../api/types';

export const recipeRepository = {
  async getRecipes(): Promise<Recipe[]> {
    const { data } = await recipeApi.getRecipes();
    return data;
  },
  async getRecipe(id: string): Promise<Recipe> {
    const { data } = await recipeApi.getRecipe(id);
    return data;
  },
  async createRecipe(
    payload: Recipe,
  ): Promise<{ message: string; recipe: Recipe }> {
    const { data } = await recipeApi.createRecipe(payload);
    return data;
  },
  async updateRecipe(payload: Partial<Recipe>): Promise<{ message: string }> {
    const { data } = await recipeApi.updateRecipe(payload);
    return data;
  },
  async deleteRecipe(id: string): Promise<{ message: string }> {
    const { data } = await recipeApi.deleteRecipe(id);
    return data;
  },
  async addFavoriteRecipe(id: string): Promise<{ message: string }> {
    const { data } = await recipeApi.addFavoriteRecipe(id);
    return data;
  },
  async removeFavoriteRecipe(id: string): Promise<{ message: string }> {
    const { data } = await recipeApi.removeFavoriteRecipe(id);
    return data;
  },
};

import { recipeApi } from '../api/recipeApi';
import { Recipe } from '../api/types';

export const recipeRepository = {
  async getRecipes(numberOfRecipes?: number, currentPage?: number) {
    const { data } = await recipeApi.getRecipes(numberOfRecipes, currentPage);
    return data;
  },
  async getRecipe(id: string) {
    const { data } = await recipeApi.getRecipe(id);
    return data;
  },
  async createRecipe(payload: FormData) {
    const { data } = await recipeApi.createRecipe(payload);
    return data;
  },
  async updateRecipe(payload: Partial<Recipe>) {
    const { data } = await recipeApi.updateRecipe(payload);
    return data;
  },
  async deleteRecipe(id: string) {
    const { data } = await recipeApi.deleteRecipe(id);
    return data;
  },
  async addFavoriteRecipe(id: string) {
    const { data } = await recipeApi.addFavoriteRecipe(id);
    return data;
  },
  async removeFavoriteRecipe(id: string) {
    const { data } = await recipeApi.removeFavoriteRecipe(id);
    return data;
  },
};

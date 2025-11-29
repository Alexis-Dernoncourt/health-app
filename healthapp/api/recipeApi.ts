import client from './client';
import { Recipe } from './types';

export const recipeApi = {
  getRecipes: () => client.get<Recipe[]>('/recipes'),
  getRecipe: (id: string) => client.get<Recipe>(`/recipes/${id}`),
  createRecipe: (payload: Recipe) =>
    client.post<{ message: string; recipe: Recipe }>('/recipes', payload),
  updateRecipe: (payload: Partial<Recipe>) =>
    client.patch<{ message: string }>('/recipes', payload),
  deleteRecipe: (id: string) =>
    client.delete<{ message: string }>('/recipes', { data: { id } }),
  addFavoriteRecipe: (id: string) =>
    client.post<{ message: string }>('/recipes/like', { id }),
  removeFavoriteRecipe: (id: string) =>
    client.post<{ message: string }>('/recipes/unlike', { id }),
};

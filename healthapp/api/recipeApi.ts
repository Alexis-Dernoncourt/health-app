import client from './client';
import { Recipe } from './types';

export const recipeApi = {
  getRecipes: () => client.get<Recipe[]>('/recipes'),
  getUserRecipes: () => client.get<Recipe[]>('/recipes/user'),
  getRecipe: (id: string) => client.get<Recipe>(`/recipes/${id}`),
  createRecipe: async (payload: FormData) =>
    await client.post<{ message: string; recipe: Recipe }>(
      '/recipes',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ),
  updateRecipe: (payload: Partial<Recipe>) =>
    client.patch<{ recipeId: string; message: string }>('/recipes', payload),
  deleteRecipe: (id: string) =>
    client.delete<{ recipeId: string; message: string }>('/recipes', {
      data: { id },
    }),
  addFavoriteRecipe: (id: string) =>
    client.post<{ recipeId: string; message: string }>('/recipes/like', { id }),
  removeFavoriteRecipe: (id: string) =>
    client.post<{ recipeId: string; message: string }>('/recipes/unlike', {
      id,
    }),
};

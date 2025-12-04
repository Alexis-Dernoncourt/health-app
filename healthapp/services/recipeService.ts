import { useMutation, useQuery } from '@tanstack/react-query';
import { recipeRepository } from '../repositories/recipeRepository';
import { Recipe } from '../api/types';
import queryClient from '../lib/react-query';

export const recipeService = {
  useGetRecipes(numberOfRecipes?: number, currentPage?: number) {
    return useQuery({
      queryKey: ['recipes'],
      queryFn: () => recipeRepository.getRecipes(numberOfRecipes, currentPage),
    });
  },
  useGetRecipe(id: string) {
    return useQuery({
      queryKey: ['recipe_' + id],
      queryFn: () => recipeRepository.getRecipe(id),
    });
  },
  useCreateRecipe() {
    return useMutation({
      mutationFn: (payload: FormData) => recipeRepository.createRecipe(payload),
      onSuccess: async ({ recipe, message }) => {
        await queryClient.invalidateQueries({ queryKey: ['recipes'] });
        return { recipe, message };
      },
      onError: (err: any) => {
        console.log(JSON.stringify(err?.response?.data, null, 2));
      },
    });
  },
  useUpdateRecipe() {
    return useMutation({
      mutationFn: (payload: Partial<Recipe>) =>
        recipeRepository.updateRecipe(payload),
      onSuccess: async ({ recipeId, message }) => {
        console.log('Recipe updated successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe_' + recipeId] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
        return { recipeId, message };
      },
    });
  },
  useDeleteRecipe() {
    return useMutation({
      mutationFn: (id: string) => recipeRepository.deleteRecipe(id),
      onSuccess: async ({ recipeId, message }) => {
        console.log('Recipe deleted successfully');
        await Promise.all([
          queryClient.removeQueries({ queryKey: ['recipe_' + recipeId] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
        return { recipeId, message };
      },
    });
  },
  useAddFavoriteRecipe() {
    return useMutation({
      mutationFn: (id: string) => recipeRepository.addFavoriteRecipe(id),
      onSuccess: async ({ recipeId, message }) => {
        console.log('Favorite recipe added successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe_' + recipeId] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
        return { recipeId, message };
      },
    });
  },
  useRemoveFavoriteRecipe() {
    return useMutation({
      mutationFn: (id: string) => recipeRepository.removeFavoriteRecipe(id),
      onSuccess: async ({ recipeId, message }) => {
        console.log('Favorite recipe removed successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe_' + recipeId] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
        return { recipeId, message };
      },
    });
  },
};

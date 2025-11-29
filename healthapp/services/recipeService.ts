import { useMutation, useQuery } from '@tanstack/react-query';
import { recipeRepository } from '../repositories/recipeRepository';
import { Recipe } from '../api/types';
import queryClient from '../lib/react-query';

export const recipeService = {
  useGetRecipes() {
    return useQuery({
      queryKey: ['recipes'],
      queryFn: () => recipeRepository.getRecipes(),
    });
  },
  useGetRecipe(id: string) {
    return useQuery({
      queryKey: ['recipe_' + id],
      queryFn: () => recipeRepository.getRecipe(id),
    });
  },
  useCreateRecipe(payload: Partial<Recipe>) {
    return useMutation({
      mutationFn: () => recipeRepository.updateRecipe(payload),
      onSuccess: async () => {
        console.log('Recipe created successfully');
        await queryClient.invalidateQueries({ queryKey: ['recipes'] });
      },
    });
  },
  useUpdateRecipe(payload: Partial<Recipe>) {
    return useMutation({
      mutationFn: () => recipeRepository.updateRecipe(payload),
      onSuccess: async () => {
        console.log('Recipe updated successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe' + payload.id] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
      },
    });
  },
  useDeleteRecipe(id: string) {
    return useMutation({
      mutationFn: () => recipeRepository.deleteRecipe(id),
      onSuccess: async () => {
        console.log('Recipe deleted successfully');
        await Promise.all([
          queryClient.removeQueries({ queryKey: ['recipe_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
      },
    });
  },
  useAddFavoriteRecipe(id: string) {
    return useMutation({
      mutationFn: () => recipeRepository.addFavoriteRecipe(id),
      onSuccess: async () => {
        console.log('Favorite recipe added successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
      },
    });
  },
  useRemoveFavoriteRecipe(id: string) {
    return useMutation({
      mutationFn: () => recipeRepository.removeFavoriteRecipe(id),
      onSuccess: async () => {
        console.log('Favorite recipe removed successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['recipe_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        ]);
      },
    });
  },
};

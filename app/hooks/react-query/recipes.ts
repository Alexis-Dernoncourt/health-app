import {useQuery} from '@tanstack/react-query';
import {fetchRecipeDetails, fetchRecipes} from '../../lib/axios/recipes';

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
};

export const useRecipeDetails = (id: string) => {
  return useQuery({
    queryKey: ['recipe' + id],
    queryFn: () => fetchRecipeDetails(id),
  });
};

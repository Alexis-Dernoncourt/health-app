import {useQuery} from '@tanstack/react-query';
import {fetchRecipes} from '../../lib/axios/recipes';

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
};

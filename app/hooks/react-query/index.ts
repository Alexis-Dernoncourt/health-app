import {useQuery} from '@tanstack/react-query';
import {fetchHomepage} from '../../lib/axios/api';

export const useHomepage = () => {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: fetchHomepage,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchHomepage,
  });
};

import {useQuery} from '@tanstack/react-query';
import {fetchImage, fetchImages} from '../../lib/axios/images';

export const useImages = () => {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  });
};

export const useImage = (id: number) => {
  return useQuery({
    queryKey: ['images'],
    queryFn: () => fetchImage(id),
  });
};

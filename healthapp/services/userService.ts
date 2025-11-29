import { useMutation, useQuery } from '@tanstack/react-query';
import { userRepository } from '../repositories/userRepository';
import { createUserPayload, User } from '../api/types';
import queryClient from '../lib/react-query';

export const userService = {
  useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: () => userRepository.getUsers(),
    });
  },
  useGetUser(id: string) {
    return useQuery({
      queryKey: ['user_' + id],
      queryFn: () => userRepository.getUser(id),
    });
  },
  useCreateUser() {
    return useMutation({
      mutationFn: (payload: createUserPayload) =>
        userRepository.createUser(payload),
      onSuccess: async () => {
        console.log('User created successfully');
        await queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  },
  useUpdateUser(id: string) {
    return useMutation({
      mutationFn: (payload: Partial<User>) =>
        userRepository.updateUser(id, payload),
      onSuccess: async res => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['user_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
        ]);
        return res;
      },
      onError: () => {
        console.log('User update failed');
      },
    });
  },
  useDeleteUser() {
    return useMutation({
      mutationFn: (id: string) => userRepository.deleteUser(id),
      onSuccess: async id => {
        console.log('User deleted successfully');
        await Promise.all([
          queryClient.removeQueries({ queryKey: ['user_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['users'] }),
        ]);
      },
    });
  },
};

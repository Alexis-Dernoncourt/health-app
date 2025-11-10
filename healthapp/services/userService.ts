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
  useCreateUser(payload: createUserPayload) {
    return useMutation({
      mutationFn: () => userRepository.createUser(payload),
      onSuccess: async () => {
        console.log('User created successfully');
        await queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  },
  useUpdateUser(payload: User) {
    return useMutation({
      mutationFn: () => userRepository.updateUser(payload),
      onSuccess: async () => {
        console.log('User updated successfully');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['user_' + payload.id] }),
          queryClient.invalidateQueries({ queryKey: ['users'] }),
        ]);
      },
    });
  },
  useDeleteUser(id: string) {
    return useMutation({
      mutationFn: () => userRepository.deleteUser(id),
      onSuccess: async () => {
        console.log('User deleted successfully');
        await Promise.all([
          queryClient.removeQueries({ queryKey: ['user_' + id] }),
          queryClient.invalidateQueries({ queryKey: ['users'] }),
        ]);
      },
    });
  },
};

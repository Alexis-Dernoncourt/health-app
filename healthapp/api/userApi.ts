import { Recipe, User } from './types';
import client from './client';

export const userApi = {
  fetchUsers: () => client.get<User[]>('/users'),
  getUserRecipes: () => client.get<Recipe[]>('/users/recipes'),
  fetchUser: (id: string) => client.get<User>(`/users/${id}`),
  createUser: (payload: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) =>
    client.post<{ user: { id: string }; message: string }>('/users', payload),
  updateUser: (
    id: string,
    payload: {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
    },
  ) => client.patch<{ message: string }>(`/users/${id}`, payload),
  updateUserImage: (image: FormData) =>
    client.post<{ message: string }>(`/users/image`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteUser: (id: string) =>
    client.delete<{ message: string }>(`/users/${id}`),
};

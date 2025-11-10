import { User } from './types';
import client from './client';

export const userApi = {
  fetchUsers: () => client.get<User[]>('/users'),
  fetchUser: (id: string) => client.get<User>(`/users/${id}`),
  createUser: (payload: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => client.post<User>('/users', payload),
  updateUser: (payload: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
  }) => client.patch<{ message: string }>('/users', payload),
  deleteUser: (id: string) =>
    client.delete<{ message: string }>(`/users/${id}`),
};

import { LoginCredentials, RegisterCredentials, User } from './types';
import client from './client';

export const authApi = {
  register: (credentials: RegisterCredentials) =>
    client.post<{ message: string }>('/register', credentials),
  login: (credentials: LoginCredentials) =>
    client.post<{ message: string; access_token: string; user: User }>(
      '/login',
      credentials,
    ),
  logout: (token: string) =>
    client.post<{ message: string }>('/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

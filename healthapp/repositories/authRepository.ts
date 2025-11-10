import { authApi } from '../api/authApi';
import { AuthResponse } from '../api/types';

export const authRepository = {
  async register(
    firstname: string,
    lastname: string | undefined,
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const { data } = await authApi.register({
      firstname,
      lastname,
      email,
      password,
    });
    return data;
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await authApi.login({ email, password });
    return data;
  },
  async logout(token: string): Promise<{ message: string }> {
    const { data } = await authApi.logout(token);
    return data;
  },
};

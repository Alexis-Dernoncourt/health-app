import { authApi } from '../api/authApi';

export const authRepository = {
  async register(
    firstname: string,
    lastname: string | undefined,
    email: string,
    password: string,
  ) {
    const { data } = await authApi.register({
      firstname,
      lastname,
      email,
      password,
    });
    return data;
  },
  async login(email: string, password: string) {
    const { data } = await authApi.login({ email, password });
    return data;
  },
  async logout(token: string) {
    const { data } = await authApi.logout(token);
    return data;
  },
};

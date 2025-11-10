import { storage } from '../lib/mmkv_store';
import { authRepository } from '../repositories/authRepository';

export const authService = {
  async login(email: string, password: string) {
    const data = await authRepository.login(email, password);
    console.log(
      'We store the user & token into storage:',
      data.user,
      data.access_token,
    );
    storage.set(
      'user',
      JSON.stringify({ ...data.user, access_token: data.access_token }),
    );
    return data;
  },
  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    const data = await authRepository.register(
      firstname,
      lastname,
      email,
      password,
    );
    return data;
  },
  async logout(token: string) {
    const data = await authRepository.logout(token);
    storage.remove('user');
    return data;
  },
};

import { clientStorage } from '../lib/mmkv_store';
import { authRepository } from '../repositories/authRepository';

export const authService = {
  async login(email: string, password: string) {
    const data = await authRepository.login(email, password);
    console.log(
      'We store the user & token into storage:',
      data.user,
      data.access_token,
    );
    clientStorage.setItem('usertoken', data.access_token);
    clientStorage.setItem('userId', data.user.id);
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
  async logout() {
    const token = clientStorage.getItem('usertoken');
    if (!token) {
      return;
    }
    const data = await authRepository.logout(token);
    clientStorage.removeItem('usertoken');
    clientStorage.removeItem('userId');
    return data;
  },
};

import { configureAuth } from 'react-query-auth';
import { LoginCredentials, RegisterCredentials } from '../../api/types';
import { User } from '../../api/types';
import { authService } from '../../services/authService';
import { userRepository } from '../../repositories/userRepository';
import { clientStorage } from '../mmkv_store';

async function userFn(): Promise<User | null> {
  const USER_ID = clientStorage.getItem('userId');
  if (!USER_ID) {
    return null;
  }
  const storedUser = userRepository.getUser(USER_ID);
  return storedUser ?? null;
}

async function loginFn(data: LoginCredentials) {
  const response = await authService.login(data.email, data.password);
  const user = { ...response.user, access_token: response.access_token };
  return user;
}

async function registerFn(data: RegisterCredentials): Promise<null> {
  await authService.register(
    data.firstname,
    data.lastname ?? '',
    data.email,
    data.password,
  );
  return null;
}

async function logoutFn() {
  return await authService.logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
    userKey: ['user'],
  });

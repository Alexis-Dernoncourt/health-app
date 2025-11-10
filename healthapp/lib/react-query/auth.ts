import { configureAuth } from 'react-query-auth';
import { LoginCredentials, RegisterCredentials } from '../../api/types';
import { User } from '../../api/types';
import { authService } from '../../services/authService';
import { userRepository } from '../../repositories/userRepository';
import { USER_DATA } from '../utils';

async function userFn(): Promise<User | null> {
  const storedUser = userRepository.getUser(USER_DATA.id);
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
  if (!USER_DATA) return;
  return await authService.logout(USER_DATA.access_token);
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
    userKey: ['user'],
  });

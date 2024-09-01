import {configureAuth} from 'react-query-auth';
import {login, logout, register} from '../axios/api';
import {fetchUser} from '../axios/user';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../axios/types';
import {storage, storeData} from '../utils';
import {User} from '../axios/types';

async function userFn(): Promise<User | null> {
  const storedUser = await storage.getToken('user');
  const {id} = storedUser ? JSON.parse(storedUser) : null;
  const user = await fetchUser(id);
  return user ?? null;
}

async function handleUserResponse(data: AuthResponse) {
  const {token, user} = data;
  storage.setToken(token.token);
  storeData('user', JSON.stringify(user));
  return user;
}

async function loginFn(data: LoginCredentials) {
  const response = await login(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials) {
  const response = await register(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  const token = await storage.getToken('token');
  if (token) {
    return await logout(token);
  }
  return null;
}

export const {useUser, useLogin, useRegister, useLogout, AuthLoader} =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
    userKey: ['user'],
  });

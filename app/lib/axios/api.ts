import axios, {AxiosResponse} from 'axios';
import {LoginCredentials, RegisterCredentials} from './types';
import Config from 'react-native-config';

export const api = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHomepage = async () => {
  try {
    const req = await api.request({
      url: '/',
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchHomepage ~ error:', error);
  }
};

export async function handleApiResponse(response: AxiosResponse) {
  const data = await response.data;

  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    console.error(JSON.stringify(data, null, 2));
    return Promise.reject(data);
  }
}

export const register = async (credentials: RegisterCredentials) => {
  try {
    const req = await api.request({
      url: '/signin',
      method: 'POST',
      data: credentials,
    });
    return handleApiResponse(req);
  } catch (error) {
    console.log('🚀 ~ register ~ error:', error);
  }
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const req = await api.request({
      url: '/login',
      method: 'POST',
      data: credentials,
    });
    if (req.data.token) {
      api.defaults.headers.Authorization = `Bearer ${req.data.token.token}`;
    }
    return handleApiResponse(req);
  } catch (error) {
    console.log('🚀 ~ login ~ error:', error);
  }
};

export const logout = async (token: string): Promise<any> => {
  try {
    const req = await api.request({
      url: '/logout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleApiResponse(req);
  } catch (error) {
    console.log('🚀 ~ logout ~ error:', error);
  }
};

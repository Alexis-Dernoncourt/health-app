import axios from 'axios';
import Config from 'react-native-config';
import { clientStorage } from '../lib/mmkv_store';

const client = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  config => {
    const USER_TOKEN = clientStorage.getItem('usertoken');
    console.log('🚀 ~ USER_TOKEN:', USER_TOKEN);
    config.headers.Authorization = `Bearer ${USER_TOKEN}`;
    return config;
  },
  error => {
    console.log('🚀 ~ error:', error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => response,
  error => {
    console.log('🚀 ~ error:', error);
    return Promise.reject(error);
  },
);

export default client;

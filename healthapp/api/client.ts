import axios from 'axios';
import Config from 'react-native-config';
import { USER_DATA } from '../lib/utils';

const client = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('🚀 ~ USER_DATA.access_token:', USER_DATA.access_token);
client.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${USER_DATA.access_token}`;
    return config;
  },
  error => Promise.reject(error),
);

client.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default client;

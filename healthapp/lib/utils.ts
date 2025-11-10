import { User } from '../api/types';
import { storage } from './mmkv_store';

const USER = storage.getString('user');
export const USER_DATA: User & { access_token: string } = USER
  ? JSON.parse(USER)
  : '';

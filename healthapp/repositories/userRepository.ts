import { createUserPayload, User } from '../api/types';
import { userApi } from '../api/userApi';

export const userRepository = {
  async getUsers(): Promise<User[]> {
    const { data } = await userApi.fetchUsers();
    return data;
  },
  async getUser(id: string): Promise<User> {
    const { data } = await userApi.fetchUser(id);
    return data;
  },
  async createUser(payload: createUserPayload): Promise<User> {
    const { data } = await userApi.createUser(payload);
    return data;
  },
  async updateUser(payload: User): Promise<{ message: string }> {
    const { data } = await userApi.updateUser(payload);
    return data;
  },
  async deleteUser(id: string): Promise<{ message: string }> {
    const { data } = await userApi.deleteUser(id);
    return data;
  },
};

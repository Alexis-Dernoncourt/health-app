import { createUserPayload, User } from '../api/types';
import { userApi } from '../api/userApi';

export const userRepository = {
  async getUsers() {
    const { data } = await userApi.fetchUsers();
    return data;
  },
  async getUserRecipes() {
    const { data } = await userApi.getUserRecipes();
    return data;
  },
  async getUser(id: string) {
    const { data } = await userApi.fetchUser(id);
    return data;
  },
  async createUser(payload: createUserPayload) {
    const { data } = await userApi.createUser(payload);
    return data;
  },
  async updateUser(id: string, payload: Partial<User>) {
    const { data } = await userApi.updateUser(id, payload);
    return data;
  },
  async deleteUser(id: string) {
    const { data } = await userApi.deleteUser(id);
    return data;
  },
};

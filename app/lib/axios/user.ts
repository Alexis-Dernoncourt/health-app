import {api} from './api';

export const fetchUsers = async () => {
  try {
    const req = await api.request({
      url: '/users',
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchUsers ~ error:', error);
    return Promise.reject(error);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const req = await api.request({
      url: `/users/${id}`,
      method: 'GET',
    });
    return req.data.user[0];
  } catch (error) {
    console.log('🚀 ~ fetchUser ~ error:', error);
    return Promise.reject(error);
  }
};

export const createUser = async (payload: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  try {
    const req = await api.request({
      url: '/users',
      method: 'POST',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ createUser ~ error:', error);
    return Promise.reject(error);
  }
};

export const updateUser = async (payload: {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}) => {
  try {
    const req = await api.request({
      url: '/users',
      method: 'PATCH',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ updateUser ~ error:', error);
    return Promise.reject(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const req = await api.request({
      url: `/users/${id}`,
      method: 'DELETE',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ deleteUser ~ error:', error);
    return Promise.reject(error);
  }
};

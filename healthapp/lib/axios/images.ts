/* import {api} from './api';
import {Image, Recipe} from './types';

export const fetchImages = async (): Promise<{images: Image[]}> => {
  try {
    const req = await api.request({
      url: '/images',
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchImages ~ error:', error);
    return Promise.reject(error);
  }
};

export const fetchImage = async (id: number): Promise<{image: Image}> => {
  try {
    const req = await api.request({
      url: `/images/${id}`,
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchImage ~ error:', error);
    return Promise.reject(error);
  }
};

export const createImage = async (payload: Recipe): Promise<any> => {
  try {
    const req = await api.request({
      url: '/images',
      method: 'POST',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ createImage ~ error:', error);
    return Promise.reject(error);
  }
};

export const updateImage = async (payload: Partial<Recipe>) => {
  try {
    const req = await api.request({
      url: '/images',
      method: 'PATCH',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ updateImage ~ error:', error);
    return Promise.reject(error);
  }
};

export const deleteImage = async (id: string) => {
  try {
    const req = await api.request({
      url: `/images/${id}`,
      method: 'DELETE',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ deleteImage ~ error:', error);
    return Promise.reject(error);
  }
};
 */

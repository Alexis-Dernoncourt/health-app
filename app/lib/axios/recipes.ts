import {api} from './api';
import {Recipe} from './types';

export const fetchRecipes = async (): Promise<{recipes: Recipe[]} | any> => {
  try {
    const req = await api.request({
      url: '/recipes',
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchRecipes ~ error:', error);
    return Promise.reject(error);
  }
};

export const fetchRecipe = async (
  id: string,
): Promise<{recipe: Recipe} | PromiseRejectedResult> => {
  try {
    const req = await api.request({
      url: `/recipes/${id}`,
      method: 'GET',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ fetchRecipe ~ error:', error);
    return Promise.reject(error);
  }
};

export const createRecipe = async (
  payload: Recipe,
): Promise<{message: string; recipe: Recipe} | PromiseRejectedResult> => {
  try {
    const req = await api.request({
      url: '/recipes',
      method: 'POST',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ createRecipe ~ error:', error);
    return Promise.reject(error);
  }
};

export const updateRecipe = async (
  payload: Partial<Recipe>,
): Promise<{message: string} | PromiseRejectedResult> => {
  try {
    const req = await api.request({
      url: '/recipes',
      method: 'PATCH',
      data: payload,
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ updateRecipe ~ error:', error);
    return Promise.reject(error);
  }
};

export const deleteRecipe = async (
  id: string,
): Promise<{message: string} | PromiseRejectedResult> => {
  try {
    const req = await api.request({
      url: `/recipes/${id}`,
      method: 'DELETE',
    });
    return req.data;
  } catch (error) {
    console.log('🚀 ~ deleteRecipe ~ error:', error);
    return Promise.reject(error);
  }
};

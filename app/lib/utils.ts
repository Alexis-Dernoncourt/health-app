import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('🚀 ~ storage->storeData ~ e:', e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    console.log('🚀 ~ storage->getData ~ e:', e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.log('🚀 ~ storage->removeData ~ e:', e);
  }
};

export const storage = {
  getToken: (key: string) => getData(key),
  setToken: (token: string) => storeData('token', token),
  clearToken: (key: string) => removeData(key),
};

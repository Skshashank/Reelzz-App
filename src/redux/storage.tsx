import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv'; // saves redux state

const storage = new MMKV(); // MMKV is preferred over AsyncStorage for speed, efficiency, and reliability in large-scale or performance-sensitive apps.

// it will store JWT token
export const token_storage = new MMKV({
  id: 'user_storage',
  encryptionKey: 'YOUR_RSA_KEY',
});

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;

import { setLocalStorageItem, getObjectFromLocalStorage } from './localStorageHelper';

export const getSignedUser = () => {
  const user = getObjectFromLocalStorage('user');
  return user || null;
};

export const setLoginSession = (user) => {
  setLocalStorageItem('user', user);
};

export const unsetLoginSession = () => {
  setLocalStorageItem('user', null);
};

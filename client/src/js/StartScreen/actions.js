import {
  LOGIN, LOGIN_USER_SUCCESS, LOGOUT, SET_LOG_STATUS,
} from './actionTypes';

export const login = (userData) => ({
  type: LOGIN,
  payload: {
    userData,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const setLogStatus = (user) => ({
  type: SET_LOG_STATUS,
  payload: {
    isSignedIn: Boolean(user),
    role: user.role,
  },
});

export const loginSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    isSignedIn: true,
    role: user.role,
  },
});

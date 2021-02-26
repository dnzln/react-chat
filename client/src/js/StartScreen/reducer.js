import { unsetLoginSession } from '../services/authService';
import { LOGIN_USER_SUCCESS, LOGOUT, SET_LOG_STATUS } from './actionTypes';

const initialState = {
  isSignedIn: false,
  role: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        isSignedIn: true,
        role: action.payload.role,
      };

    case LOGOUT: {
      unsetLoginSession();
      return {
        isSignedIn: false,
        role: '',
      };
    }

    case SET_LOG_STATUS: {
      return {
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

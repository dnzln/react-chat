import axios from 'axios';
import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import api from '../shared/config/api.json';
import { LOGIN, LOGIN_USER_SUCCESS } from './actionTypes';

export function* userLogin(action) {
  try {
    const user = yield call(axios.post, `${api.url}/auth/login`, action.payload.userData);
    yield put({ type: LOGIN_USER_SUCCESS, payload: { role: user.data.role } });
  } catch (error) {
    console.log('userLogin error:', error.message);
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN, userLogin);
}

export default function* loginSagas() {
  yield all([
    watchLoginUser(),
  ]);
}

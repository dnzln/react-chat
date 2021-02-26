import { all } from 'redux-saga/effects';
import userLogin from '../StartScreen/sagas';
import userPageSagas from '../userPage/sagas';
import usersSagas from '../users/sagas';
import chatSagas from '../Chat/sagas';

export default function* rootSaga() {
  yield all([
    userPageSagas(),
    usersSagas(),
    userLogin(),
    chatSagas(),
  ]);
}

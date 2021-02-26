import axios from 'axios';
import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import { extendMessageData, getChatStats } from '../services/messagesHelpers';
import api from '../shared/config/api.json';
import {
  ADD_NEW_MESSAGE,
  FETCH_MESSAGES,
  GET_MESSAGES_DATA,
  UPLOAD_MESSAGES,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  LIKE_MESSAGE,
} from './actionsTypes';

export function* fetchMessages() {
  try {
    const messages = yield call(axios.get, `${api.url}/messages`);
    yield put({ type: 'FETCH_MESSAGES_SUCCESS', payload: { messages: messages.data } });
  } catch (error) {
    console.log('fetchMessages error:', error.message);
  }
}

function* watchFetchMessages() {
  yield takeEvery(FETCH_MESSAGES, fetchMessages);
}

export function* uploadMessages() {
  try {
    const messagesData = yield call(axios.get, `${api.url}/messages`);
    let messages = yield call(extendMessageData, messagesData.data);
    const chatStatistic = yield call(getChatStats, messages);
    messages = yield messages.sort((a, b) => a.time - b.time);
    yield put({
      type: UPLOAD_MESSAGES,
      payload: { messages: [...messages], ...chatStatistic, isLoading: false },
    });
  } catch (error) {
    console.log('uploadMessages error:', error.message);
  }
}

function* watchUploadMessages() {
  yield takeEvery(GET_MESSAGES_DATA, uploadMessages);
}

export function* likeMessages(action) {
  const { id, likes } = action.payload;
  const newValue = (likes > 0) ? 0 : 1;
  const updatedLikes = { likes: newValue };

  try {
    yield call(axios.put, `${api.url}/messages/${id}`, updatedLikes);
    yield put({ type: GET_MESSAGES_DATA });
  } catch (error) {
    console.log('updateMessage error:', error.message);
  }
}

function* watchLikeMessages() {
  yield takeEvery(LIKE_MESSAGE, likeMessages);
}

export function* addMessage(action) {
  const newMessage = { ...action.payload.message };

  try {
    yield call(axios.post, `${api.url}/messages`, newMessage);
    yield put({ type: GET_MESSAGES_DATA });
  } catch (error) {
    console.log('createMessage error:', error.message);
  }
}

function* watchAddMessage() {
  yield takeEvery(ADD_NEW_MESSAGE, addMessage);
}

export function* updateMessage(action) {
  const { id } = action.payload;
  const updatedMessage = { text: action.payload.text };

  try {
    yield call(axios.put, `${api.url}/messages/${id}`, updatedMessage);
    yield put({ type: GET_MESSAGES_DATA });
  } catch (error) {
    console.log('updateMessage error:', error.message);
  }
}

function* watchUpdateMessage() {
  yield takeEvery(UPDATE_MESSAGE, updateMessage);
}

export function* deleteMessage(action) {
  try {
    yield call(axios.delete, `${api.url}/messages/${action.payload.id}`);
    yield put({ type: GET_MESSAGES_DATA });
  } catch (error) {
    console.log('deleteMessage Error:', error.message);
  }
}

function* watchDeleteMessage() {
  yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

export default function* chatSagas() {
  yield all([
    watchUploadMessages(),
    watchLikeMessages(),
    watchFetchMessages(),
    watchAddMessage(),
    watchUpdateMessage(),
    watchDeleteMessage(),
  ]);
}

import {
  ADD_NEW_MESSAGE,
  GET_MESSAGES_DATA,
  LIKE_MESSAGE,
  DELETE_MESSAGE,
  UPDATE_CHAT_STAT,
  UPDATE_MESSAGE,
  UPLOAD_MESSAGES,
} from './actionsTypes';

export const updateChatStatistic = ({ membersTotal, messagesTotal, lastMessageAt }) => ({
  type: UPDATE_CHAT_STAT,
  payload: {
    membersTotal,
    messagesTotal,
    lastMessageAt,
  },
});

export const addMessagesData = (state) => ({
  type: UPLOAD_MESSAGES,
  payload: {
    state,
  },
});

export const getMessages = () => ({
  type: GET_MESSAGES_DATA,
});

export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: {
    message,
  },
});

export const likeMessage = (id, likes) => ({
  type: LIKE_MESSAGE,
  payload: {
    id,
    likes,
  },
});

export const removeMessage = (id) => ({
  type: DELETE_MESSAGE,
  payload: {
    id,
  },
});

export const updateMessage = (text, id) => ({
  type: UPDATE_MESSAGE,
  payload: {
    text,
    id,
  },
});

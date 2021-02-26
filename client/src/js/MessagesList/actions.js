import {
  ADD_NEW_MESSAGE, UPDATE_CHAT_STAT, UPLOAD_MESSAGES, LIKE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE,
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


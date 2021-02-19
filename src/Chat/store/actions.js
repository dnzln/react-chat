import { ADD_NEW_MESSAGE, UPDATE_CHAT_STAT, UPLOAD_MESSAGES, CHANGE_STATE, LIKE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE } from "./actionsTypes";


export const updateChatStatistic = ({membersTotal, messagesTotal, lastMessageAt}) => ({
    type: UPDATE_CHAT_STAT,
    payload: {
      membersTotal,
      messagesTotal,
      lastMessageAt
    }
});

export const addMessagesData = state => ({
    type: UPLOAD_MESSAGES,
    payload: {
        state
    }
});

export const changeState = state => ({
    type: CHANGE_STATE,
    payload: {
        state
    }
});

export const addNewMessage = (text, id) => ({
    type: ADD_NEW_MESSAGE,
    payload: {
      text,
      id
    }
});

export const likeMessage = (id) => ({
  type: LIKE_MESSAGE,
  id
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  id
});

export const updateMessage = (text, id) => ({
  type: UPDATE_MESSAGE,
  payload: {
    text,
    id
  }
});

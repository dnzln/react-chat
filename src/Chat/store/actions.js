import { ADD_NEW_MESSAGE, UPLOAD_MESSAGES, CHANGE_STATE, LIKE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE } from "./actionsTypes";


export const addMessagesData = messages => ({
    type: UPLOAD_MESSAGES,
    payload: {
        messages
    }
});

export const changeState = state => ({
    type: CHANGE_STATE,
    payload: {
        state
    }
});

export const addNewMessage = (text) => ({
    type: ADD_NEW_MESSAGE,
    text
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

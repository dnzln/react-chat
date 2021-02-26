import {
  UPLOAD_MESSAGES, UPDATE_CHAT_STAT, FETCH_MESSAGES_SUCCESS,
} from './actionsTypes';

const initialState = {
  messages: [],
  isLoading: true,
  membersTotal: 0,
  messagesTotal: 0,
  lastMessageAt: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CHAT_STAT: {
      return { ...state, ...action.payload };
    }

    case UPLOAD_MESSAGES: {
      const newState = action.payload;
      return { ...state, ...newState };
    }

    case FETCH_MESSAGES_SUCCESS: {
      const { messages } = action.payload;
      return { ...state, messages: [...messages] };
    }

    default: return state;
  }
}

import { getNewId, getTimeFromMs } from "../service";
import { ADD_NEW_MESSAGE, UPLOAD_MESSAGES, UPDATE_CHAT_STAT, LIKE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE } from "./actionsTypes";

export default function rootReducer(state, action) {
  switch (action.type) {
    case UPDATE_CHAT_STAT: {
      return { ...state, ...action.payload };
    }

    case UPLOAD_MESSAGES: {
      const newState = action.payload.state;
      return { ...state, ...newState };
    }

    case REMOVE_MESSAGE: {
      const messages = state.messages.filter(message => message.id !== action.id);
      return { ...state, messages };
    }
      
    case UPDATE_MESSAGE: {
      const messages = state.messages.map(message => {
        if (message.id === action.payload.id) message.text = action.payload.text;
        return message;
      });
      return { ...state, messages };
    }
      
    case LIKE_MESSAGE: {
      const messages = state.messages.map(message => {
      if (message.id === action.id) message.likes = message.likes > 0 ? 0 : 1;
        return message;
      });
      return { ...state, messages };
    }
      
    case ADD_NEW_MESSAGE: {
      let newMessage = {
        text: action.payload.text,
        userId: action.payload.id,
        createdAt: Date.now(),
        date: new Date(),
        isOwn: true,
        likes: 0,
        time: getTimeFromMs(Date.now()),
        id: getNewId(),
      };
      
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    }
    
    default: return state;
  }
}
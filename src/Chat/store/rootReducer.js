import { ADD_NEW_MESSAGE, UPLOAD_MESSAGES, LIKE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE, CHANGE_STATE } from "./actionsTypes";

export default function rootReducer(state, action) {
  switch (action.type) {
    case CHANGE_STATE: return { ...state, ...action.payload.state };

    case UPLOAD_MESSAGES: {
      const {messages} = action.payload;
      return { ...state, messages };
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
        text: action.text,
        createdAt: Date.now(),
        id: "id" + Math.random().toString(16).slice(2),
        userId: state.userId,
        isOwn: true,
      };
      
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    }
    
    default: return state;
  }
}
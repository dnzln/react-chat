import { combineReducers } from 'redux';
import users from '../users/reducer';
import userPage from '../userPage/reducer';
import messages from '../Chat/reducer';
import user from '../StartScreen/reducer';

const rootReducer = combineReducers({
  users,
  userPage,
  messages,
  user,
});

export default rootReducer;

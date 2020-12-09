import { combineReducers } from 'redux';
import postReducer from './postReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  post: postReducer,
  search: searchReducer,
  user: userReducer,
});

export default rootReducer;

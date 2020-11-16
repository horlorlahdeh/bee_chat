import { combineReducers } from 'redux';
import auth from './user';
import message from './message';
import socket from './socket';

export default combineReducers({
  auth,
  message,
  socket
});

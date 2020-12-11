import {
  SOCKET_OPEN, SOCKET_CLOSE
} from '../actions/types';

const initialState = {
    isConnected: false,
    reconnectError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SOCKET_OPEN:
      
      return {
        ...state,
        isConnected: payload.authenticated,
      };
    case SOCKET_CLOSE:
      return {
        ...state,
        reconnectError: payload.data,
      };
    default:
      return state;
  }
}

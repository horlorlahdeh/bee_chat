import { SOCKET_OPEN, SET_LIVE, SEND_MSG, DELETE_MESSAGE, SET_READ } from './types';
import { ws } from '../socket/socket';
import store from '../store';
import AsyncStorage from '@react-native-community/async-storage';
// import { getAllConversations } from './message';

export const connectWebsocket = () => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('refresh_token');

    console.log(token);
    let payload = {
      token: token,
    };
    ws.onopen = async (e) => {
      ws.send(JSON.stringify({ type: 'authenticate', payload: payload }));
      console.log('Websocket Client Re-Connected', e);
    };
  } catch (err) {
    console.error(err);
  }
};
export const startWebsocket = (token) => async (dispatch) => {
  let socket = ws;
  socket.onopen = (e) => {
    console.log('Connected to Websockets');
    let payload = {
      token: token,
    };

    socket.send(JSON.stringify({ type: 'authenticate', payload: payload }));
    console.log('Websocket Client Connected', e, token);
  };
  socket.onmessage = function (e) {
    console.log(
      'websocket message event:',
      JSON.parse(e.data).payload.authenticated
    );
    if (!JSON.parse(e.data).payload.authenticated) {
      setTimeout(startWebsocket, 500);
    }
  };
  socket.onerror = function (e) {
    console.log(e);
  };
  socket.onclose = function () {
    // connection closed, discard old websocket and create a new one in 5s
    socket = null;
    setTimeout(startWebsocket, 5000);
  };
};

export const getWebSocketMessage = (context) => async (dispatch) => {
  // dispatch(getAllConversations());
  try {
    ws.onmessage = async (e) => {
      let wsData = JSON.parse(e.data);

      if (wsData.type === 'status' && wsData.payload.authenticated) {
        dispatch({
          type: SOCKET_OPEN,
          payload: wsData.payload,
        });
      }
      if (wsData.type === 'conversation-created') {
        dispatch({
          type: SET_LIVE,
          payload: wsData.payload,
        });
        // dispatch(getAllConversations());
        console.log(wsData.payload);
      }
      if (wsData.type === 'chat-message') {
        dispatch({
          type: SET_LIVE,
          payload: wsData.payload,
        });
        console.log(wsData.payload);
      }
      if (wsData.type === 'acknowledged') {
        dispatch({
          type: SET_READ,
          payload: wsData.payload,
        });
        console.log(wsData.payload);
      }
      if (wsData.type === 'message-deleted') {
        dispatch({
          type: DELETE_MESSAGE,
          payload: wsData.payload,
        });
        console.log(wsData.payload);
      }
    };
  } catch (err) {
    console.error(err);
  }
};

export const createChat = (message, to) => async (dispatch) => {
  try {
    ws.send(
      JSON.stringify({
        type: 'create-conversation',
        payload: {
          to: to,
          message: message,
        },
      })
    );
  } catch (err) {
    console.error(err);
  }
};
export const sendMessage = (message, to, id) => async (dispatch) => {
  try {
    if (to.length > 1) {
      to = null;
    } else {
      to = to[0];
      console.log(to, message, id);
    }
    ws.send(
      JSON.stringify({
        type: 'chat-message',
        payload: {
          conversation_id: id,
          to: to,
          message: message,
        },
      })
    );
  } catch (err) {
    console.error(err);
  }
};

// Yet to be resolved
export const deleteMessage = (id) => async (dispatch) => {
  try {
    ws.send(
      JSON.stringify({
        type: 'delete-message',
        payload: {
          id: id,
        },
      })
    );
  } catch (err) {
    console.error(err);
  }
};


export const setRead = (id) => async (dispact) => {
try {
    ws.send(
      JSON.stringify({
        type: 'acknowledgment',
        payload: {
          conversation_id: id,
        },
      })
    );
  } catch (err) {
    console.error(err);
  }
}
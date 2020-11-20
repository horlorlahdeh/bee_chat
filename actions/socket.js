import { AUTH_SOCKET, SET_LIVE, SEND_MSG } from './types';
import ws from '../socket/socket';
import store from '../store';
import AsyncStorage from '@react-native-community/async-storage';
// import { getAllConversations } from './message';

export const connectWebsocket = (tokenText) => async (dispatch) => {
  try {
    // let token = await AsyncStorage.getItem('refresh_token');
    let token = tokenText;
    console.log(token)
    let payload = {
      token: token,
    };
    ws.onopen = async () => {
      ws.send(JSON.stringify({ type: 'authenticate', payload: payload }));
      console.log('Websocket Client Connected');
    };
  } catch (err) {
    console.error(err);
  }
};

export const getWebSocketMessage = (context) => async (dispatch) => {
  // dispatch(getAllConversations());
  console.log('take chat to up-side');
  try {
    ws.onmessage = async (e) => {
      let wsData = JSON.parse(e.data);

      if (
        wsData.type === 'status' &&
        wsData.payload.authenticated
      ) {
        dispatch({
          type: AUTH_SOCKET,
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

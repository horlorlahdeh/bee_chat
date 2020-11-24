import {
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  SET_UNREAD,
  SET_MEMBERS,
  DELETE_MESSAGE,
} from './types';
import { getWebSocketMessage } from './socket';
import axios from 'axios';

export const getAllConversations = () => async (dispatch) => {
  const data = await axios.get(
    'https://beechat.hive-engine.com/api/messages/conversations'
  );
  dispatch({
    type: SET_CONVERSATIONS,
    payload: data,
  });
  // console.log(data)
};
export const getAllMembers = () => async (dispatch) => {
  const data = await axios.get(
    'https://beechat.hive-engine.com/api/messages/conversations'
  );
  dispatch({
    type: SET_MEMBERS,
    payload: data,
  });
  // console.log(data)
};

export const getConversation = (id) => async (dispatch) => {
  const data = await axios.get(
    'https://beechat.hive-engine.com/api/messages/chats',
    {
      params: {
        conversation_id: id,
      },
    }
  );
  dispatch({
    type: SET_CONVERSATION,
    payload: data,
  });
  dispatch(getWebSocketMessage());
  dispatch(getAllConversations());
  // console.log(data)
};
export const getUnread = () => async (dispatch) => {
  const data = await axios.get(
    'https://beechat.hive-engine.com/api/messages/new'
  );

  dispatch({
    type: SET_UNREAD,
    payload: data,
  });
  console.log(data.data)
};

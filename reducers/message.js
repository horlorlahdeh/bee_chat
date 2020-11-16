import {
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  SET_UNREAD,
  SET_LIVE,
  SET_MEMBERS,
} from '../actions/types';

const initialState = {
  conversations: [],
  conversation: [],
  channels: [],
  messages: [],
  reply: [],
  members: [],
  recipient: '',
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: payload.data,
      };
    case SET_MEMBERS:
      return {
        ...state,
        members: payload.data,
      };
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: payload.data,
      };
    case SET_LIVE:
      // console.log(payload)
      return {
        ...state,
        reply:
          payload.to !== null
            ? state.reply.push(payload)
            : state.reply.concat(payload),
      };

    case SET_UNREAD:
      return {
        ...state,
        messages: payload.data,
      };

    default:
      return state;
  }
}

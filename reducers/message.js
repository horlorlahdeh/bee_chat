import {
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  SET_UNREAD,
  SET_LIVE,
  SET_MEMBERS,
  SET_READ,
  DELETE_MESSAGE,
} from '../actions/types';

const initialState = {
  conversations: [],
  conversation: [],
  channels: [],
  unreadMessages: [],
  unread: null,
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
        loading: false
      };
    case SET_MEMBERS:
      return {
        ...state,
        members: payload.data,
        loading: false
      };
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: payload.data,
        // loading: false
      };
    case SET_LIVE:
      return {
        ...state,
        loading:false,
        reply:
          payload.to !== null
            ? state.reply.push(payload)
            : state.reply.concat(payload),

      };

    case SET_UNREAD:
      return {
        ...state,
        unreadMessages: payload.data,
      };
    case SET_READ:
      return {
        ...state,
        loading: false,
        // unreadMessages: unreadMessages.filter(
        //   (msg) => msg.conversation_id !== payload
        // ),
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        conversation: conversation.filter((message) => {
          message.id !== payload.id;
        }),
        loading: false,
      };

    default:
      return state;
  }
}

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SET_REFRESH_TOKEN,
  GET_FRIENDS,
  GET_FRIENDS_REQUESTS,
  USER_SETTINGS,
  USER_CHANNELS,
  HIVE_DATA,
  LOGOUT,
} from '../actions/types';
import {
  getToken,
  storeToken,
  removeToken,
  storeRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  getUsername,
  removeUsername,
} from '../utils/localData';

const initialState = {
  token: getToken(),
  refresh_token: getRefreshToken(),
  isAuthenticated: false,
  loading: true,
  username: null,
  admin: false,
  online: false,
  friends: [],
  blocked: [],
  friend_requests: [],
  settings: {},
  channels: [],
  hivedata: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        username: payload,
      };

    case LOGIN_SUCCESS:
      storeToken(payload.token);
      storeRefreshToken(payload.refresh_token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...payload,
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      removeToken();
      removeRefreshToken();
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        username: null,
      };
    case GET_FRIENDS:
      return {
        ...state,
        ...payload,
      };
    case HIVE_DATA:
      return {
        ...state,
        hivedata: payload,
      };
    case GET_FRIENDS_REQUESTS:
      return {
        ...state,
        friend_requests: payload,
      };
    case USER_SETTINGS:
      return {
        ...state,
        settings: payload,
      };
    case USER_CHANNELS:
      return {
        ...state,
        channels: payload,
      };

    default:
      return state;
  }
}

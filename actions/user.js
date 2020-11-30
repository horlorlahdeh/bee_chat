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
} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from '../utils/setAuthToken';
import { cryptoUtils, Client } from '@hiveio/dhive';
import { PrivateKey } from '@esteemapp/dhive';
// import CryptoJS from 'crypto-js'
// import sha256 from 'crypto-js/sha256';
import * as Crypto from 'expo-crypto';
// import { ws, startWebsocket } from '../socket/socket';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
  getWebSocketMessage,
  connectWebsocket,
  startWebsocket,
} from './socket';

var hClient = new Client('https://api.hive.blog');

//Load User
export const loadUser = () => async (dispatch) => {
  let token = await AsyncStorage.getItem('refresh_token');
  if (token) {
    setAuthToken(token);
  }

  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/verify'
    );
    dispatch({
      type: USER_LOADED,
      payload: data.data.username,
    });
  } catch (err) {
    console.error(err.response.data.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
  dispatch(setRefreshToken());
};
// Set Refresh Token
export const setRefreshToken = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/refresh-token'
    );
    dispatch({
      type: SET_REFRESH_TOKEN,
      payload: data.data,
    });
  } catch (err) {
    console.error(err);
  }
};
// Login User
// Login User
export const login = (username, key) => async (dispatch) => {
  let token = await AsyncStorage.getItem('refresh_token');
  const ts = Date.now();
  // if(!wif) {

  // }
  // let hash = Buffer.from(cryptoUtils.sha256(`${username}${ts}`));

  const privateKey = PrivateKey.fromString(key);
  sig = privateKey
    .sign(Buffer.from(cryptoUtils.sha256(username + ts)))
    .toString();
  console.log(sig);
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/login',
      {
        params: {
          username,
          ts,
          sig,
        },
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });
    console.log(sig, ts, username);
    // dispatch(connectWebsocket(data.data.refresh_token));

    setTimeout(() => {
      dispatch(startWebsocket(token));
    }, 1000);
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch({ type: LOGIN_FAIL });
  }
};
export const logout = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/logout'
    );
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get Friends
export const getFriends = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/friends'
    );
    dispatch({
      type: GET_FRIENDS,
      payload: data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get Friends Requests
export const getFriendRequests = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/friend-requests'
    );
    console.log(data.data);
    dispatch({
      type: GET_FRIENDS_REQUESTS,
      payload: data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get User Settings
export const userSettings = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/users/settings'
    );
    console.log(data.data);
    dispatch({
      type: USER_SETTINGS,
      payload: data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get User Channels
export const userChannels = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/channels'
    );
    console.log(data.data);
    dispatch({
      type: USER_CHANNELS,
      payload: data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get Wallet Balances
export const getBalances = (username) => async (dispatch) => {
  try {
    let account = username;

    let userDetails = await hClient.database.getAccounts([account]);
    let data = userDetails[0];
    console.log(data);
    dispatch({
      type: HIVE_DATA,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const pinLock = (username, key, pin) => async (dispatch) => {
  // const ts = Date.now();
  // const privateKey = PrivateKey.fromString(key);
  SecureStore.setItemAsync(username, key, pin);
  let myKey = await SecureStore.getItemAsync(username);
  if (myKey) {
    console.log(myKey, username);
  }

  const sig = await privateKey
    .sign(Buffer.from(cryptoUtils.sha256(username + ts)))
    .toString();

  try {
    const data = await axios.get(
      'https://beechat.hive-engine.com/api/users/login',
      {
        params: {
          username,
          ts,
          sig,
        },
      }
    );
    dispatch(
      {
        type: LOGIN_SUCCESS,
        payload: data.data,
      },

      console.log(data.data)
    );
    dispatch(loadUser());
  } catch (err) {
    console.error(err.message);
    dispatch({ type: LOGIN_FAIL });
    //do nothing for now
  }
};

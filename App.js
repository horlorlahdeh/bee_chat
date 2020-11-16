import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/user';
import Routes from './routes/Routes';
import ws from './socket/socket';

let getTokenValue = async () => await AsyncStorage.getItem('refresh_token');
let token = getTokenValue();
let ref_token = store.getState().auth.refresh_token;

if (token) {
  setAuthToken(token);
  console.log(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());

    ws.onerror = function (evt) {
      console.log(evt);
    };
    return () => {
      ws.close();
      ws.onclose = function (evt) {
        // if (evt.type === 'close') {
        //   setTimeout(connectWS(), 10000);
        // }
        console.log('Connection Closed', evt);
      };
    };
  }, [token]);

  return (
    <Provider store={store}>
      <NavigationContainer store={store}>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 20,
  },
  text: {
    fontSize: 35,
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    alignSelf: 'center',
  },
});
export default App;

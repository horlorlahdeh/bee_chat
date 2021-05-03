// eslint-disable-next-line
import "./global.js";
import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, Image, Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/user";
import Routes from "./routes/Routes";
import { ws, startWebsocket } from "./socket/socket";
let getTokenValue = async () => await AsyncStorage.getItem("refresh_token");
let token = getTokenValue();

if (token) {
  setAuthToken(token);
}
async function callStartWebsocket() {
  let ref_token = await store.getState().auth.refresh_token;
  startWebsocket(ref_token);
  console.log('test websocket if working')
}
callStartWebsocket();

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // if (ws.readyState === WebSocket.CLOSED) {
    //   // Do your stuff...
    //   callStartWebsocket();
    // }
    setTimeout(() => {
      // callStartWebsocket();
      // console.log('Status WS: ' + ws.readyState);
    }, 500)
    return () => {
      ws.close();
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
    backgroundColor: "#eee",
    paddingTop: 20,
  },
  text: {
    fontSize: 35,
    marginVertical: "auto",
    marginHorizontal: "auto",
    alignSelf: "center",
  },
});
export default App;

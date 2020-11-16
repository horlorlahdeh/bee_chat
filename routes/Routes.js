import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
// Main App Screens
import { ChatListScreen } from '../screens/ChatListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { GiftedChatScreen } from '../screens/GiftedChatScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { GroupChatScreen } from '../screens/GroupChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WalletScreen } from '../screens/WalletScreen';
import { LoadingScreen } from '../components/LoadingScreen';

//auth stack, if user is not authenticated
const authStack = createStackNavigator();

//main drawer, if user is authenticated
const mainStack = createStackNavigator();

const Routes = ({ auth }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn();
  }, [auth.isAuthenticated]);

  const isLoggedIn = () => {
   
    if (auth.isAuthenticated) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return auth.loading ? (
    <LoadingScreen />
  ) : !auth.isAuthenticated ? (
    <authStack.Navigator>
      <authStack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <authStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </authStack.Navigator>
  ) : (
    <mainStack.Navigator>
      <mainStack.Screen
        name='Chats'
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='Chat'
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='GiftedChat'
        component={GiftedChatScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='Friends'
        component={FriendsScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='GroupChats'
        component={GroupChatScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <mainStack.Screen
        name='Wallet'
        component={WalletScreen}
        options={{ headerShown: false }}
      />
    </mainStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Routes);

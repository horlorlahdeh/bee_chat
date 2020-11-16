import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { ChatListScreen } from '../screens/ChatListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { GroupChatScreen } from '../screens/GroupChatScreen';

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={'Chats'} component={ChatListScreen} />
      <HomeStack.Screen name={'PrivateChat'} component={ChatScreen} />
      <HomeStack.Screen name={'Friends'} component={FriendsScreen} />
      <HomeStack.Screen name={'GroupChat'} component={GroupChatScreen} />
    </HomeStack.Navigator>
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

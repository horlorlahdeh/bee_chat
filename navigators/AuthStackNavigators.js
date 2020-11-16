import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';


const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={'Home'} component={HomeScreen} />
      <AuthStack.Screen name={'Login'} component={LoginScreen} />
      
    </AuthStack.Navigator>
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

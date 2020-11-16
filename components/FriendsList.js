import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Avatar, Button, Header, Accessory } from 'react-native-elements';

export const FriendsList = ({ item, loading }) => {
  const navigation = useNavigation();
  return  (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat');
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: `https://images.hive.blog/u/${item}/avatar`,
          }}
        />
        <Text style={styles.text}>{item} </Text>
        <Text style={styles.messageCount}>message</Text>
      </View>
    </TouchableOpacity>
  );
};

FriendsList.defaultProps = {
  title: 'Blank',
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 1.5,
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: 'lightyellow',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 20,
    lineHeight: 70,
  },
  messageCount: {
    color: '#000',
    fontSize: 15,
    lineHeight: 25,
    marginLeft: 'auto',
    padding: 3,
    backgroundColor: 'goldenrod',
    borderRadius: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

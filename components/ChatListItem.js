import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getUnread } from '../actions/message';

// import { Avatar, Button, Header, Accessory } from 'react-native-elements';

const _ListItem = ({ item, auth, getUnread, messages }) => {
  const navigation = useNavigation();
  const itemArr = item.members.filter((e) => e !== auth.username);
  useEffect(() => {
    // getUnread();
    console.log('item',itemArr)
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GiftedChat', { id: item.id, to: itemArr });
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: `${
              itemArr.length > 1
                ? 'https://img.icons8.com/ios-filled/2x/group-foreground-selected.png'
                : `https://images.hive.blog/u/${itemArr[0]}/avatar`
            }`,
          }}
        />
        <Text style={styles.text}>
          {itemArr.length > 1 ? itemArr.join(', ') : itemArr}{' '}
        </Text>
        <Text style={styles.messageCount}>{messages.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

_ListItem.defaultProps = {
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
    // borderBottomColor: '#fff',
    // borderBottomWidth: 2,
    // width: '100%',
    lineHeight: 70,
  },
  messageCount: {
    color: '#000',
    fontSize: 12,
    lineHeight: 20,
    marginLeft: 'auto',

    backgroundColor: 'goldenrod',
    height: 20,
    width: 20,
    borderRadius: 100 / 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    messages: state.message.messages,
  };
};

const ChatListItem = connect(mapStateToProps, { getUnread })(_ListItem);
export { ChatListItem };

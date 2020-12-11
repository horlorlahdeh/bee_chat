import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getUnread } from '../actions/message';
import { setRead } from '../actions/socket';

// import { Avatar, Button, Header, Accessory } from 'react-native-elements';

const _ListItem = ({ item, items, count, auth, getUnread, setRead, messages, conversations }) => {
  const navigation = useNavigation();
  const itemArr = item.members.filter((e) => e !== auth.username);

  
  useEffect(() => {
    getUnread();
    
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        setRead(item.id);
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
        {count > 0 && (
          <Text style={styles.messageCount}>{count > 0 ? count : ''}
            {/* {Math.floor(Math.random() * messages.length + 1)} */}
          </Text>
        )}
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
    lineHeight: 30,
    marginLeft: 'auto',
    overflow: 'hidden',
    backgroundColor: 'goldenrod',
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    messages: state.message.unreadMessages,
    conversations: state.message.conversations,
  };
};

const ChatListItem = connect(mapStateToProps, { getUnread, setRead })(_ListItem);
export { ChatListItem };

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getUnread } from '../actions/message';

// import { Avatar, Button, Header, Accessory } from 'react-native-elements';

const _ListItem = ({ item, items, auth, getUnread, messages }) => {
  const navigation = useNavigation();
  const itemArr = item.members.filter((e) => e !== auth.username);
  useEffect(() => {
    getUnread();

    // let number = items.map((r) => ({
    //     ...r,
    //     members: r.members.filter((m) => m !== auth.username),
    //     updated_at: new Date(r.updated_at).getTime(),
    //   }))
    //   .sort((a, b) => b.updated_at - a.updated_at)
    //   .reduce((acc, cur) => {
    //     const newMessages = items.filter(
    //       (m) =>
    //         m.conversation_id === cur.id &&
    //         (m.to === auth.username || m.to === null) &&
    //         m.read === false
    //     );

    //     if (!cur.name) {
    //       cur.name = cur.members.join(', ');
    //     }

    //     acc.push({ ...cur, unread: newMessages.length });

    //     return acc;
    //   }, []);


   
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
        {messages.length > 0 && <Text style={ styles.messageCount}>
          {Math.floor(Math.random() * messages.length + 1)}
        </Text>}
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
    borderRadius: 30/2,
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

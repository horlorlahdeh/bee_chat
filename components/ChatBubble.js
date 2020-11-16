import { StatusBar } from 'expo-status-bar';
import React, { useState, Fragment } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

// import { Avatar, Button, Header, Accessory } from 'react-native-elements';

const _ChatBubble = ({ item, auth }) => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <TouchableOpacity
        style={
          item.from !== auth.username
            ? styles.senderMainBubble
            : styles.receiverMainBubble
        }
        onPress={() => {
          navigation.navigate('PrivateChat');
        }}
      >
        <View
          style={
            item.from !== auth.username
              ? styles.senderContainer
              : styles.receiverContainer
          }
        >
          <Image
            style={styles.img}
            source={{
              uri: `https://images.hive.blog/u/${item.from}/avatar`,
            }}
          />
          <Text style={styles.text}>{item.content} </Text>
        </View>
        <Text
          style={
            item.from !== auth.username
              ? styles.senderMessageCount
              : styles.receiverMessageCount
          }
        >
          {item.timestamp}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.senderMainBubble}
        onPress={() => {
          navigation.navigate('PrivateChat');
        }}
      >
        <View style={styles.receiverContainer}>
          <Text style={styles.text}>{item.content} </Text>

          <Image
            style={styles.img}
            source={{
              uri: `https://images.hive.blog/u/${item.from}/avatar`,
            }}
          />
        </View>
        <Text style={styles.receiverMessageCount}>{item.time}</Text>
      </TouchableOpacity> */}
    </Fragment>
  );
};

_ChatBubble.defaultProps = {
  title: 'Blank',
};
const styles = StyleSheet.create({
  senderMainBubble: {
    padding: 8,
  },
  receiverMainBubble: {
    padding: 8,
  },
  senderContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginRight: 'auto',
    borderLeftWidth: 1,
    backgroundColor: 'lightyellow',
    // borderRadius: 25,
    width: 'auto',
  },
  receiverContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: 'lightgray',
    marginLeft: 'auto',
    borderRightWidth: 1,
    // borderRadius: 25,
    width: 'auto',
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
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 20,
    // borderBottomColor: '#fff',
    // borderBottomWidth: 2,
    // width: '100%',
    lineHeight: 20,
  },
  senderMessageCount: {
    color: '#000',
    fontSize: 10,
    textAlign: 'right',
    marginRight: 'auto',
    paddingTop: 4,
    color: 'darkgray',
  },
  receiverMessageCount: {
    color: '#000',
    fontSize: 10,
    textAlign: 'left',
    marginLeft: 'auto',
    paddingTop: 4,
    color: 'darkgray',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const ChatBubble = connect(mapStateToProps, {})(_ChatBubble);
export { ChatBubble };

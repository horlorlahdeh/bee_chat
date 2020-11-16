import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { ListItem } from '../components/ChatListItem';
import { Header } from '../components/Header';
import { MainAppHeader } from '../components/MainAppHeader';
import { connect } from 'react-redux';
import { userChannels } from '../actions/user';

const _GroupChatScreen = ({ userChannels, channels, message }) => {
  const [headerTexts, setHeaderText] = useState({
    privateTitle: 'Private',
    groupTitle: 'Groups',
    friendsTitle: 'Friends',
    searchTitle: 'Search',
    id: 2,
  });
  const getRando = () => {
    return Math.floor(Math.random() * 10 + 1);
  };
  const [items, setItems] = useState([
    { id: 1, text: 'Reaz', messages: getRando(), time: Date.now() },
    { id: 2, text: 'Bait', messages: getRando() },
    { id: 3, text: 'Lion', messages: getRando() },
    { id: 4, text: 'Aggroed', messages: getRando() },
    { id: 5, text: 'Gerber', messages: getRando() },
    { id: 6, text: 'Cryptomancer', messages: getRando() },
    { id: 7, text: 'Ken', messages: getRando() },
    { id: 8, text: 'Ben', messages: getRando() },
    { id: 9, text: 'Oladele', messages: getRando() },
    { id: 10, text: 'Guiltyguy', messages: getRando() },
    { id: 11, text: 'Kittie', messages: getRando() },
    { id: 12, text: 'Ragon', messages: getRando() },
    { id: 13, text: 'Tango', messages: getRando() },
  ]);
  useEffect(() => {
    userChannels();
    console.log(channels);
  }, []);
  return (
    <View style={styles.container}>
      <MainAppHeader title={headerTexts} notification={message.length} />
      <View style={styles.channelsContentWrapper}>
        <View style={styles.channelSections}>
          <Text style={styles.channelsHeader}>Channels</Text>
          {channels.length > 0 ? (
            <FlatList
              style={styles.channelsContent}
              data={channels}
              renderItem={({ item }) => {
                return <FriendsList item={item} loading={loading} />;
              }}
              keyExtractor={(item, id) => id.toString()}
            />
          ) : (
            <Text style={styles.channelsContent}>
              You currenlty have no channels...
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  channelsContentWrapper: {
    padding: 8,
  },
  channelSections: {
    backgroundColor: 'lightyellow',
    marginBottom: 8,
    padding: 8,
  },
  channelsContent: {
    marginBottom: 10,
    borderBottomColor: '#eee',
    // borderBottomSize: '1px',
  },
  channelsHeader: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  text: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingBottom: 15,
    textTransform: 'capitalize',
  },
});
const mapStateToProps = (state) => {
  return {
    channels: state.auth.channels,
    message: state.message.messages
  };
};
const GroupChatScreen = connect(mapStateToProps, { userChannels })(
  _GroupChatScreen
);
export { GroupChatScreen };

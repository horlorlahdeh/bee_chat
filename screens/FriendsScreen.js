import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { FriendsList } from '../components/FriendsList';
import { Header } from '../components/Header';
import { MainAppHeader } from '../components/MainAppHeader';
import { connect } from 'react-redux';
import { getFriends, getFriendRequests } from '../actions/user';

const _FriendsScreen = ({
  getFriends,
  getFriendRequests,
  auth: { friends, blocked, friend_requests, loading }, message
}) => {
  const [isLoading, setLoading] = useState(true);
  const [headerTexts, setHeaderText] = useState({
    privateTitle: 'Private',
    groupTitle: 'Groups',
    friendsTitle: 'Friends',
    searchTitle: 'Search',
    id: 3,
  });

  useEffect(() => {
    getFriends();
    getFriendRequests();
    setLoading(!isLoading);
    // eslint-disable-next-line
  }, []);
  if (loading)
    return (
      <>
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
  return (
    <View style={styles.container}>
      <MainAppHeader title={headerTexts} notification={message.length} />
      <View style={styles.friendContentWrapper}>
        <View style={styles.friendSections}>
          <Text style={styles.friendHeader}>Incoming Requests</Text>
          {friend_requests.length > 0 ? (
            <FlatList
              style={styles.friendContent}
              data={friend_requests}
              renderItem={({ item }) => {
                return <FriendsList item={item} loading={loading} />;
              }}
              keyExtractor={(item, id) => id.toString()}
            />
          ) : (
            <Text style={styles.friendContent}>
              You have no incoming friend requests...
            </Text>
          )}
        </View>
        <View style={styles.friendSections}>
          <Text style={styles.friendHeader}>Current Friends</Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              style={styles.friendContent}
              data={friends}
              renderItem={({ item }) => {
                return <FriendsList item={item} />;
              }}
              keyExtractor={(item, id) => id.toString()}
            />
          )}
        </View>
        <View style={styles.friendSections}>
          <Text style={styles.friendHeader}>Blocked</Text>
          {blocked.length > 0 ? (
            <FlatList
              style={styles.friendContent}
              data={blocked}
              renderItem={({ item }) => {
                return <FriendsList item={item} loading={loading} />;
              }}
              keyExtractor={(item, id) => id.toString()}
            />
          ) : (
            <Text style={styles.friendContent}>
              You have no blocked contact so far...
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#eee',
  },
  friendSections: {
    backgroundColor: 'lightyellow',
    marginBottom: 8,
    padding: 8,
  },
  friendContentWrapper: {
    padding: 8,
  },
  friendHeader: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  friendContent: {
    marginBottom: 10,
    borderBottomColor: '#eee',
    // borderBottomSize: '1px',
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
    auth: state.auth,
    message: state.message.unreadMessages,
  };
};

const FriendsScreen = connect(mapStateToProps, {
  getFriends,
  getFriendRequests,
})(_FriendsScreen);
export { FriendsScreen };

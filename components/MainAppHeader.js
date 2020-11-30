import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { logout } from '../actions/user';
import { getAllConversations, getUnread } from '../actions/message';

import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

export const _MainAppHeader = ({
  title,
  notification,
  logout,
  getAllConversations,
  getUnread,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [didMount, setDidMount] = useState(notification ? true : false);
  const [isActive, setIsActive] = useState(title.id);

  useEffect(() => {
    if (didMount) {
      getUnread();
      console.log(notification);
      console.log(route.name);
    }
    return () => {
      // cleanup
      setDidMount(false);
    };
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      >
        <Icon name='cog' size={20} color='#000' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          navigation.navigate('Wallet');
          // logout();
        }}
      >
        <Icon name='wallet' size={20} color='#000' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutIcon}
        onPress={() => {
          logout();
        }}
      >
        <Icon name='user-times' size={20} color='#000' />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 15,
        }}
        onPress={() => {
          navigation.navigate('Chats');
          setIsActive(1);
        }}
      >
        <View style={route.name === 'Chats' ? styles.active : ''}>
          <Text style={styles.text}>{title.privateTitle} </Text>
        </View>
        {notification.length > 0 && (
          <Text style={styles.notification}>{notification.length}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GroupChats');
          setIsActive(2);
        }}
      >
        <View style={route.name === 'GroupChats' ? styles.active : ''}>
          <Text style={styles.text}>{title.groupTitle}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Friends');
          setIsActive(3);
        }}
      >
        <View 
          style={route.name === 'Friends' ? styles.active : ''}>
        
          <Text 
        style={styles.text}>
          
            {title.friendsTitle}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

_MainAppHeader.defaultProps = {
  title: 'Chats',
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 20,
    marginBottom: 0,
    // paddingTop: 90,
    backgroundColor: 'goldenrod',
    height: 125,
    alignItems: 'flex-end',
  },
  searchbar: {
    display: 'flex',
    width: '100%',
  },
  text: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 35,
    paddingBottom: 15,
    textTransform: 'capitalize',
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    right: 56,
    zIndex: 1,
  },
  settingsIcon: {
    position: 'absolute',
    top: 50,
    right: 96,
    zIndex: 1,
  },
  logoutIcon: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1,
  },
  notification: {
    color: 'goldenrod',
    fontSize: 12,
    overflow: 'hidden',
    padding: 8,
    marginRight: 0,
    lineHeight: 15,
    backgroundColor: '#000',
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    notification: state.message.unreadMessages,
  };
};
const MainAppHeader = connect(mapStateToProps, {
  logout,
  getAllConversations,
  getUnread,
})(_MainAppHeader);
export { MainAppHeader };

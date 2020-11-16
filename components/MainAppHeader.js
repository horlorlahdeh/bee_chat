import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { logout } from '../actions/user';
import { getAllConversations } from '../actions/message';
import { connect } from 'react-redux';

export const _MainAppHeader = ({
  title,
  notification,
  logout,
  getAllConversations,
}) => {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(title.id);
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
        onPress={() => {
          navigation.navigate('Chats');
          setIsActive(1);
        }}
      >
        <Text style={isActive === 1 ? styles.active : styles.text}>
          {title.privateTitle}{' '}
          <Text style={styles.notification}>{notification}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GroupChats');
          setIsActive(2);
        }}
      >
        <Text style={isActive === 2 ? styles.active : styles.text}>
          {title.groupTitle}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Friends');
          setIsActive(3);
        }}
      >
        <Text style={isActive === 3 ? styles.active : styles.text}>
          {title.friendsTitle}
        </Text>
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
    paddingHorizontal: 30,
    paddingBottom: 15,
    textTransform: 'capitalize',
  },
  active: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingBottom: 15,
    textTransform: 'capitalize',
    borderBottomWidth: 2,
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
    fontSize: 15,
    padding: 8,
    // lineHeight: 25,
    // marginLeft: 'auto',
    backgroundColor: '#000',
    height: 25,
    width: 25,
    borderRadius: 100 / 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const MainAppHeader = connect(null, { logout, getAllConversations })(
  _MainAppHeader
);
export { MainAppHeader };

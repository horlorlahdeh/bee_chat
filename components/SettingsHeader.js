import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getAllConversations } from '../actions/message';

const _GeneralHeader = ({ items }) => {
  const navigation = useNavigation();
  useEffect(() => {
   
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name='chevron-left'
          size={25}
          color='#000'
          style={styles.backIconItem}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.img}
          source={{
            uri: `${
              items.length > 1
                ? 'https://img.icons8.com/ios-filled/2x/group-foreground-selected.png'
                : `https://images.hive.blog/u/${items[0]}/avatar`
            }`,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{items.join(', ')}</Text>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          logout();
        }}
      >
        <Icon name='ellipsis-v' size={15} color='#000' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'goldenrod',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    zIndex: 999,
    top: 0,
    left: 0,
  },
  // backIcon: {
  //   position: 'absolute',
  //   top: 16,
  //   left: 16,
  //   zIndex: 1,
  // },
  backIconItem: {
    marginHorizontal: 4,
    alignSelf: 'center',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  settingsIcon: {
    position: 'absolute',
    top: 'auto',
    right: 16,
    zIndex: 1,
  },
});
_GeneralHeader.propTypes = {
  items: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    message: state.message,
    conversations: state.message.conversations,
    auth: state.auth,
  };
};
const GeneralHeader = connect(mapStateToProps, { getAllConversations })(
  _GeneralHeader
);
export { GeneralHeader };

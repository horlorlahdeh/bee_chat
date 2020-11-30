import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { ChatListItem } from '../components/ChatListItem';
import { Header } from '../components/Header';
import { MainAppHeader } from '../components/MainAppHeader';
import { connect } from 'react-redux';
import { getAllConversations } from '../actions/message';
import { createChat } from '../actions/socket';
import { ws, startWebsocket } from '../socket/socket';


const _ChatListScreen = ({
  getAllConversations,
  createChat,
  message: { conversations, unreadMessages },
}) => {
  const [headerTexts, setHeaderText] = useState({
    privateTitle: 'Private',
    groupTitle: 'Groups',
    friendsTitle: 'Friends',
    searchTitle: 'Search',
    id: 1,
  });
  const [didMount, setDidMount] = useState(conversations ? true : false);
  const [message, setMessage] = useState();
  const [recipient, setRecipient] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
 
  useEffect(() => {
    if (didMount) {
      getAllConversations();
      // console.log(conversations);
      async function callStartWebsocket() {
        let token = await AsyncStorage.getItem('refresh_token');
        startWebsocket(token);
      }
      if (ws.readyState === 0 || 2 || 3) {
        // Do your stuff...
        callStartWebsocket();
      }
      callStartWebsocket()
    }
    return () => {
      setDidMount(false);
    };

    // eslint-disable-next-line
  }, [conversations]);
  return (
    <View style={styles.container}>
      <MainAppHeader title={headerTexts} notification={unreadMessages > 0 ? unreadMessages.length : null} />
      <FlatList
        data={conversations}
        renderItem={({ item }) => {
          return <ChatListItem item={item} items={conversations} />;
        }}
        keyExtractor={(item, id) => id.toString()}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 50,
          right: 30,
          padding: 20,
          height: 70,
          width: 70,
          borderRadius: 100 / 2,
          backgroundColor: 'goldenrod',
          zIndex: 999,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon name='paper-plane' size={30} color='#000' />
      </TouchableOpacity>
      <View style={styles.outterCenteredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create Conversation</Text>
              <Input
                style={styles.input}
                placeholder={'Enter Recipient Username'}
                onChangeText={(text) => setRecipient(text)}
                value={recipient}
                keyboardType={'email-address'}
              />
              <Input
                style={styles.input}
                placeholder={'Enter Message'}
                onChangeText={(val) => setMessage(val)}
                value={message}
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: 'goldenrod',
                  marginTop: 20,
                }}
                onPress={() => {
                  createChat(message, recipient);
                }}
              >
                <Text style={styles.textStyle}>Create Conversation</Text>
              </TouchableHighlight>
              <TextButton
                style={styles.textButton}
                title={'close'}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  getAllConversations();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eee',
  },
  text: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingBottom: 15,
    textTransform: 'capitalize',
  },
  input: {
    marginVertical: 8,
    fontSize: 15,
    minWidth: 280,
  },
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 220,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'goldenrod',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  textButton: {
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

const ChatListScreen = connect(mapStateToProps, {
  getAllConversations,
  createChat,
})(_ChatListScreen);

export { ChatListScreen };

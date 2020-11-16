import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { ChatBubble } from '../components/ChatBubble';
import { Header } from '../components/Header';
import { MainAppHeader } from '../components/MainAppHeader';
import { GeneralHeader } from '../components/GeneralHeader';
import { Input } from '../components/Input';
import { connect } from 'react-redux';
import {
  getAllConversations,
  getConversation,
  getAllMembers,
} from '../actions/message';
import { createChat, sendMessage, getWebSocketMessage } from '../actions/socket';
import AsyncStorage from '@react-native-community/async-storage';

const _ChatScreen = ({
  route: { params },
  message: { conversation, conversations },
  auth,
  getConversation,
  getAllConversations,
  createChat,
  sendMessage,
}) => {
  const [headerTexts, setHeaderText] = useState({
    privateTitle: 'Private',
    groupTitle: 'Groups',
    friendsTitle: 'Friends',
    searchTitle: 'Search',
    id: 1,
  });
  const [chatMessage, setChatMessage] = useState('');
  const scrollRef = useRef();
  const { id, to } = params;

  const sendMsg = () => {
    sendMessage(chatMessage, to, id);
    // scrollRef.current.scrollToEnd({ animated: true });
    setChatMessage('');
  };
  useEffect(() => {
    getConversation(id);
    console.log(to);
    // eslint-disable-next-line
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled={true}>
      <GeneralHeader style={styles.generalHeader} items={to} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
        style={styles.container}
      >
        <View>
          <FlatList
            style={styles.bubblesWrapper}
            data={conversation}
            renderItem={({ item }) => {
              return <ChatBubble item={item} />;
            }}
            keyExtractor={(item, id) => id.toString()}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Input
            style={styles.input}
            onChangeText={(text) => setChatMessage(text)}
            value={chatMessage}
            onSubmitEditing={() => sendMsg()}
            placeholder={'Type here ...'}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#eee',
    position: 'relative',
  },
  generalHeader: {
    position: 'relative',
    width: 100,
    zIndex: 999,
    top: 0,
    left: 0,
  },

  text: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingBottom: 15,
    textTransform: 'capitalize',
  },
  bubblesWrapper: {
    marginBottom: 75,
  },
  
  input: {
    
    marginTop: 5,
    backgroundColor: '#eee',
    fontSize: 18,
    paddingVertical: 30,
    borderRadius: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    message: state.message,
    members: state.members,
    auth: state.auth,
  };
};

const ChatScreen = connect(mapStateToProps, {
  getConversation,
  getWebSocketMessage,
  createChat, sendMessage,
  getAllConversations,
  getAllMembers,
})(_ChatScreen);
export { ChatScreen };

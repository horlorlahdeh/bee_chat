import { StatusBar } from 'expo-status-bar';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  Fragment,
} from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GeneralHeader } from '../components/GeneralHeader';
import { connect } from 'react-redux';
import {
  getAllConversations,
  getConversation,
  getAllMembers,
} from '../actions/message';
import {
  createChat,
  sendMessage,
  getWebSocketMessage,
  deleteMessage,
  setRead,
} from '../actions/socket';
import { LoadingScreen } from '../components/LoadingScreen';
import { ws } from '../socket/socket';

const _GiftedChatScreen = React.memo(function _GiftedChatScreen({
  route: { params, name },
  messages: { conversation, conversations, loading, reply },
  auth,
  navigation,
  getConversation,
  getAllConversations,
  sendMessage,
  deleteMessage,
  setRead,
}) {
  const [data, setData] = useState({
    didMount: conversation ? true : false,
    messages: []
  });
  const [didMount, setDidMount] = useState(conversation ? true : false);
  const [messages, setMessages] = useState([]);
  const { id, to } = params;


  const route = useRoute();
  const chatRef = useRef();
  ws.onmessage = async (e) => {
    let dataFromServer = JSON.parse(e.data);
    if (
      dataFromServer.type === 'chat-message' &&
      dataFromServer.payload.from !== auth.username
    ) {
      console.log(dataFromServer, 'waiting for message');
      let replyMessage = dataFromServer.payload;
      let newMessageObj = {
        _id: replyMessage.id,
        createdAt: replyMessage.timestamp,
        text: replyMessage.content,
        user: {
          _id: replyMessage.from,
          name: replyMessage.from,
          avatar: `https://images.hive.blog/u/${replyMessage.from}/avatar`,
        },
      };
      onReceive(newMessageObj);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: 'goldenrod',
            marginBottom: 2,
          },
          left: {
            // Here is the color change
            backgroundColor: 'lightyellow',
            marginBottom: 2,
          },
        }}
        textStyle={{
          right: {
            color: '#000',
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
          <Icon name='paper-plane' size={30} color='#000' />
        </View>
      </Send>
    );
  };

  const setNewMessage = (messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages, false)
    );
    console.log(messages[0].text, 'check index');
    sendMessage(messages[0].text, to, id);
    chatRef.current.scrollToBottom();
  };
  const onSend = useCallback((messages = []) => {
    setNewMessage(messages);
    // getConversation(id);
  }, []);
  const onReceive = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages, false)
    );
    console.log(messages.text, 'check index');
    sendMessage(messages.text, to, id);
    chatRef.current.scrollToBottom();
  }, []);

  const onDelete = (messageIdToDelete) => {
    console.log(messageIdToDelete)
    // setMessages((previousState) => ({
    //   messages: previousState.messages.filter(
    //     (message) => message.id !== messageIdToDelete
    //   ),
    // }));
    deleteMessage(messageIdToDelete);
  };

  const onLongPress = (context, message) => {
    console.log(context, message);
    const options = ['copy', 'Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            onDelete(message._id); //pass the function here
            break;
        }
      }
    );
  };
  // New array for messages to fit into gifted chat component
  const newArray = conversation.map((message) => ({
    _id: message.id,
    createdAt: message.timestamp,
    text: message.content,
    user: {
      _id: message.from,
      name: message.from,
      avatar: `https://images.hive.blog/u/${message.from}/avatar`,
    },
  }));
  useEffect(() => {
    if (didMount) {
      getConversation(id);
      setRead(id);
      setTimeout(() => {
        chatRef.current.scrollToBottom();
      }, 1000);
      setMessages(newArray);
      console.log(route.name);
    }
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line
  }, [conversation, reply]);

  return didMount ? (
    <LoadingScreen />
  ) : (
    <Fragment>
      <GeneralHeader
        style={styles.generalHeader}
        items={to}
        updateList={getAllConversations}
      />
      <GiftedChat
        ref={chatRef}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.username,
          name: auth.username,
          avatar: `https://images.hive.blog/u/${auth.username}/avatar`,
        }}
        renderBubble={renderBubble}
        showUserAvatar
        alwaysShowSend
        renderSend={renderSend}
        renderUsernameOnMessage={true}
        inverted={false}
        onLongPress={onLongPress}
        // keyboardShouldPersistTaps={'always'}
      />
      {/* {Platform.OS === 'android' ? <KeyboardSpacer /> : null} */}
    </Fragment>
  );
});

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
    messages: state.message,
    reply: state.reply,
    members: state.members,
    auth: state.auth,
  };
};

const GiftedChatScreen = connect(mapStateToProps, {
  getConversation,
  getWebSocketMessage,
  createChat,
  sendMessage,
  getAllConversations,
  getAllMembers,
  deleteMessage,
  setRead,
})(_GiftedChatScreen);
export { GiftedChatScreen };

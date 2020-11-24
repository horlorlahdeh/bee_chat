import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
// import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { login, pinLock } from '../actions/user';

const _LoginScreen = ({ navigation, login, pinLock, _checkCode, _focusePrevInput }) => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState();
  const [key, setKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const chatRef = useRef();
  
  useEffect(() => {
  
    console.log(code);
  }, []);
  
  return (
    <View style={styles.container}>
      <Header style={styles.title}>LOGIN</Header>
      <Error error={''} style={styles.errors} />
      <Input
        style={styles.input}
        placeholder={'Enter Your Hive Username'}
        onChangeText={(text) => setUsername(text)}
        value={username}
        keyboardType={'email-address'}
      />
      <Input
        style={styles.input}
        placeholder={'Enter Your Hive Posting Key'}
        onChangeText={(val) => setKey(val)}
        value={key}
        secureTextEntry
      />
      <FilledButton
        style={styles.loginButton}
        title={'Login'}
        onPress={() => {
          // alert('Login Success')
          login(username, key);
          // navigation.navigate('Chats');
        }}
      />
      <TextButton
        style={styles.textButton}
        title={"Don't have an account?"}
        onPress={() => {}}
      />
      <TextButton
        style={styles.textButton}
        title={'Smart Lock'}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <View style={styles.centeredView}>
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
              <Text style={styles.modalText}>SignIn With Smart Lock</Text>
              <Input
                style={styles.input}
                placeholder={'Enter Your Hive Username'}
                onChangeText={(text) => setUsername(text)}
                value={username}
                keyboardType={'email-address'}
              />
              <Input
                style={styles.input}
                placeholder={'Enter Your Hive Posting Key'}
                onChangeText={(val) => setKey(val)}
                value={key}
                secureTextEntry
              />
              <Input
                style={styles.input}
                placeholder={'Enter Your Pincode'}
                onChangeText={(val) => setCode(val)}
                value={code}
                secureTextEntry={!showPassword}
              />
              {/* <SmoothPinCodeInput
                ref={ref}
                value={code}
                onTextChange={(val) => setCode({ val })}
                onFulfill={_checkCode}
                onBackspace={_focusePrevInput}
              /> */}
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: 'goldenrod',
                  marginTop: 20,
                }}
                onPress={() => {
                  pinLock(username, key, code);
                }}
              >
                <Text style={styles.textStyle}>Smart Lock</Text>
              </TouchableHighlight>
              <TextButton
                style={styles.textButton}
                title={'Hide'}
                onPress={() => {
                  setModalVisible(!modalVisible);
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
    backgroundColor: '#eee',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 128,
    marginBottom: 38,
  },
  input: {
    marginVertical: 8,
    fontSize: 15,
    minWidth: 280,
  },
  loginButton: {
    marginTop: 20,
  },
  textButton: {
    marginTop: 40,
    fontSize: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  errors: {
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
const LoginScreen = connect(null, { login, pinLock })(_LoginScreen);
export { LoginScreen };

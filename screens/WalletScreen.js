import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  Switch,
  TouchableHighlight,
} from 'react-native';
import { TextButton } from '../components/TextButton';
import { Input } from '../components/Input';
import { connect } from 'react-redux';
import { userSettings } from '../actions/user';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getBalances } from '../actions/user';

const _WalletScreen = ({
  auth: { username, settings, hivedata },
  navigation,
  getBalances,
}) => {
  const [text, setText] = useState('Welcome back,');

  const [code, setCode] = useState();
  const [key, setKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(settings);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    userSettings();
    getBalances(username);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name='chevron-left'
            size={15}
            color='#000'
            style={styles.backIconItem}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Wallet</Text>
      </View>
      <View style={styles.greetingTextWrapper}>
        <Text style={styles.greetingText}>Hello {username}</Text>
        <Image
          style={styles.img}
          source={{
            uri: `${`https://images.hive.blog/u/${username}/avatar`}`,
          }}
        />
      </View>
      <View style={styles.myPreferencesWrapper}>
        <Text style={styles.myPreferences}>Balances:</Text>
      </View>

      <View style={styles.balanceContaier}>
        <Text style={styles.balanceTitle}>HIVE:</Text>
        <Text
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          style={styles.balanceIcon}
        >
          {hivedata.balance}
        </Text>
      </View>
      <View style={styles.balanceContaier}>
        <Text style={styles.balanceTitle}>HBD:</Text>
        <Text
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          style={styles.balanceIcon}
        >
          {hivedata.hbd_balance}
        </Text>
      </View>
      <View style={styles.balanceContaier}>
        <Text style={styles.balanceTitle}>SAVINGS BALANCE:</Text>
        <Text
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          style={styles.balanceIcon}
        >
          {hivedata.savings_balance}
        </Text>
      </View>
      <View style={styles.buttonContaier}>
        <TouchableOpacity
          style={styles.walletButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.walletButton}>
          <Text style={styles.buttonText}>Widthdraw</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.walletButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity> */}
      </View>
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
              <Text style={styles.modalText}>Balance</Text>
              <Text style={styles.modalText}>{hivedata.balance}</Text>

              <Input
                style={styles.input}
                placeholder={'To: enter receiver name'}
                onChangeText={(val) => setKey(val)}
                value={key}
                secureTextEntry
              />
              <Input
                style={styles.input}
                placeholder={'Amount: enter amount'}
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
                  console.log('Transfering');
                }}
              >
                <Text style={styles.textStyle}>Transfer</Text>
              </TouchableHighlight>
              <TextButton
                style={styles.textButton}
                title={'close'}
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
    display: 'flex',
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    paddingTop: 50,
    backgroundColor: 'goldenrod',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    // height: 50,
    zIndex: 999,
    top: 0,
    left: 0,
  },
  greetingTextWrapper: {
    marginTop: 66,
    textAlign: 'center',
    alignSelf: 'center',
  },
  greetingText: {
    fontSize: 22,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 30,
  },
  tokenIcon: {
    width: 20,
    height: 20,
    margin: 0,
  },
  myPreferencesWrapper: {
    padding: 20,
  },
  input: {
    marginVertical: 8,
    fontSize: 15,
    minWidth: 280,
  },
  myPreferences: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backIconItem: {
    marginHorizontal: 4,
    marginTop: 4,
    alignSelf: 'center',
  },
  balanceContaier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 70,
  },
  balanceTitle: {
    textAlign: 'left',
    color: '#000',
    margin: 0,
    paddingHorizontal: 0,
  },
  balanceIcon: {},
  buttonContaier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  walletButton: {
    width: 110,
    backgroundColor: 'goldenrod',
    padding: 5,
    color: '#000',
    margin: 10,
    fontSize: 11,
  },
  buttonText: {
    textAlign: 'center',
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
  textButton: {
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    settings: state.auth.settings,
    auth: state.auth,
  };
};

const WalletScreen = connect(mapStateToProps, { userSettings, getBalances })(
  _WalletScreen
);

export { WalletScreen };

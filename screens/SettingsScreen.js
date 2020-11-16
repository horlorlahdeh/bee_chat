import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import { userSettings } from '../actions/user';
import Icon from 'react-native-vector-icons/FontAwesome5';

const _SettingsScreen = ({ auth: { username, settings }, navigation }) => {
  const [text, setText] = useState('Welcome back,');
  const [user, setUser] = useState('Amaad');
  const [isEnabled, setIsEnabled] = useState(settings);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    userSettings();
    console.log(settings)
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
        <Text style={styles.text}>Settings</Text>
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
        <Text style={styles.myPreferences}>Preferences:</Text>
      </View>
      <View style={styles.toggleContaier}>
        <Text style={styles.toggleTitle}>Allow DM's from friends only</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          style={styles.toggleIcon}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
   alignSelf: 'center'
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
  myPreferencesWrapper: {
    padding: 20,
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
  toggleContaier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  toggleTitle: {
    color: '#000',
  },
  toggleIcon: {},
});

const mapStateToProps = (state) => {
  return {
    settings: state.auth.settings,
    auth: state.auth,
  };
};

const SettingsScreen = connect(mapStateToProps, { userSettings })(
  _SettingsScreen
);

export { SettingsScreen };

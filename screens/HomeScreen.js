import React, { Fragment } from 'react'
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { FilledButton } from '../components/FilledButton';


export const HomeScreen = ({navigation}) => {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.mainText}>Home Screen</Text>
          <FilledButton
            style={styles.startButton}
            title={'Get Started'}
            onPress={() => {
              
              navigation.navigate('Login');
            }}
          />
        </View>
      </Fragment>
    );
}


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
  
  startButton: {
    marginTop: 20,
  },
  mainText: {
    marginTop: 200,
    fontSize: 42,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  
});
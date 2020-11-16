import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';

export const LoadingScreen = () => {
  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    return () => {
      setDidMount(false)
    }
  }, [])
  return (
    <View style={styles.container}>
      <Image
        style={styles.loadingImage}
        source={didMount ? require('../assets/splash.png') : ''}
      />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImage: {
    zIndex: 1,
    top: 0,
    left: 0,
    width: 300,
    height: 300,
    opacity: 0.7
  },
});

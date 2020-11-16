import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const TextButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, onPress]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

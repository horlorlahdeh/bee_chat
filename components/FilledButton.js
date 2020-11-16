import React from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';

export const FilledButton = ({ title, style, onPress }) => {
  return (
      <TouchableOpacity style={[styles.container, style, onPress]} onPress={onPress}>
          <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'goldenrod',
    width: '100%',
    padding: 20,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

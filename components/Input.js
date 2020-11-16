import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export const Input = ({ children, style, ...props }) => {
  return <TextInput {...props} style={[styles.input, style]} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    padding: 20,
    borderRadius: 8,

  },
  
});

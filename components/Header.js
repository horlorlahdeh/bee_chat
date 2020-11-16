import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const Header = ({ children, style, ...props }) => {
  return (
    
      <Text {...props} style={[styles.text, style]}>
        {children}
      </Text>)
    
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

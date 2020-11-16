import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const Error = ({ error, style }) => {
  return <Text style={[styles.error, style]}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: '#a64452',
    padding: 5,
    borderRadius: 2,
    fontSize: 11,
  },
});

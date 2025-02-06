import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    color: '#b00000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;

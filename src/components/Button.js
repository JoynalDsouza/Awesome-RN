import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Button = ({backgroundColor = 'red', label = 'Button'}) => {
  return (
    <>
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Text>{label}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: 100,
  },
});

export default Button;

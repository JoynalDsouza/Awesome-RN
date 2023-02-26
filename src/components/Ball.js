import React from 'react';
import {StyleSheet, View} from 'react-native';

const Ball = () => {
  return <View style={styles.ball}></View>;
};

const styles = StyleSheet.create({
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
  },
});

export default Ball;

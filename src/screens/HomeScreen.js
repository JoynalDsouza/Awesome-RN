import React, {useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'green',
    height: 4000,
  },
});

export default HomeScreen;

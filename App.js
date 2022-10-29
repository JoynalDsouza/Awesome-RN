import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
    <>
      <SafeAreaView />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello World</Text>
          <Text>Yayyy!!!</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

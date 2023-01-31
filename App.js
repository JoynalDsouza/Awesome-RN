import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import RollingNumberTicker from 'react-native-rolling-number-ticker';

const App = () => {
  return (
    <>
      <SafeAreaView />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello World</Text>
          <Text>Yayyy!!!</Text>
          <RollingNumberTicker
            textSize={20}
            fromNumber={12400}
            number={12929}
            duration={1000}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

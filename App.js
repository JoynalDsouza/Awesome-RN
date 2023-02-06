import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RollingNumberTicker from 'react-native-rolling-number-ticker';

const App = () => {
  const [text, setText] = useState('');
  return (
    <>
      <SafeAreaView />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello World</Text>
          <Text>Yayyy!!!</Text>
          <RollingNumberTicker
            textSize={50}
            fromNumber={10400}
            number={12929}
            duration={5000}
            animationStartDelay={3000}
          />
        </View>

        <View>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: 'grey',
              margin: 30,
            }}
            value={text}
            onChangeText={value => {
              let regex_num = value.replace(/^0+/, '');
              setText(regex_num);
            }}></TextInput>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

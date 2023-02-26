import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RollingNumberTicker from 'react-native-rolling-number-ticker';
import Ball from '../components/Ball';
import {formatIndianCurrency} from '../utils/utilityfuctions';

const HomeScreen = ({navigation}) => {
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

        <View>
          <Text>{formatIndianCurrency('2210.111', true)}</Text>
          <Text>{formatIndianCurrency(2210.111)}</Text>

          <Text>
            {Number('32932.378687').toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Animation')}>
            <Text>Go to Animation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

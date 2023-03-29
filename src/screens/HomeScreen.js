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
import RollingNumberTicker from 'react-native-rolling-number-ticker';
import Ball from '../components/Ball';
import CircularSlider from '../components/CircularSlider';
import Slider from '../components/Slider';
import {RatingSlider} from '../components/Slider2';
import SliderX from '../components/SliderX';
import BGSvg from '../components/svg/BGSvg';
import MaskedText from '../components/svg/MaskedText';
import SliderSvg from '../components/svg/SliderSvg';
import {formatIndianCurrency} from '../utils/utilityfuctions';

const HomeScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const backgroundAnimated = useRef(new Animated.Value(0)).current;

  const backgroundColor = backgroundAnimated.interpolate({
    inputRange: [0, 3000],
    outputRange: ['rgb(145,34,26)', 'rgb(234,234,23)'],
  });
  return (
    <>
      <SafeAreaView />
      <Animated.ScrollView>
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

        <RatingSlider />
        <SliderSvg />
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
          <SliderX />
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

        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Animation2')}>
            <Text>Go to Animation2</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.content, {backgroundColor: backgroundColor}]}></View>
      </Animated.ScrollView>
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

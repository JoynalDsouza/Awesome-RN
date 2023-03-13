import React, {useRef} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

const AnimationScreen2 = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const bgColorAnimation = useRef(new Animated.Value(0)).current;

  const backgroundColorInterpolate = bgColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'green'],
  });

  const startAnimation = () => {
    Animated.stagger(1000, [
      Animated.timing(bgColorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 2,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start();
  };
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: scale}],
            backgroundColor: backgroundColorInterpolate,
          }}>
          <Text style={{color: 'white'}}>Hello</Text>
        </Animated.View>

        <TouchableOpacity onPress={() => startAnimation()}>
          <Text>Start Animation</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AnimationScreen2;

import React, {useRef} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

const AnimationScreen2 = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const bgColorAnimation = useRef(new Animated.Value(0)).current;
  const translateAnimation = useRef(new Animated.Value(0)).current;

  const backgroundColorInterpolate = bgColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'green'],
  });

  const translateXInterpolate = translateAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 50, 0],
  });

  const opacityInterpolate = translateXInterpolate.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
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

  const startAnimation2 = () => {
    Animated.timing(translateAnimation, {
      duration: 1000,
      toValue: 2,
      useNativeDriver: true,
    }).start(() => {
      translateAnimation.setValue(0);
    });
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

        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateX: translateXInterpolate}],
            opacity: opacityInterpolate,
            // backgroundColor: backgroundColorInterpolate,
          }}>
          <Text style={{color: 'black'}}>Hello</Text>
        </Animated.View>
        <TouchableOpacity onPress={() => startAnimation2()}>
          <Text>Start Animation2</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AnimationScreen2;

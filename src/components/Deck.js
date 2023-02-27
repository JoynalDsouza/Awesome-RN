import React, {useRef} from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

const Deck = () => {
  const fade = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const color = useRef(new Animated.Value(0)).current;

  const startFadeAnimation = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 3050,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startTranslateAnimation = () => {
    Animated.timing(translate, {
      toValue: -300,
      duration: 1050,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(translate, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startScaleAnimation = () => {
    Animated.timing(scale, {
      toValue: 2,
      duration: 1050,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startColorAnimation = () => {
    Animated.timing(color, {
      toValue: 1,
      duration: 2050,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(color, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  };

  const boxInterpolation = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,99,71)', 'rgb(99,71,255)'],
  });

  const colorInterpolation = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(99,71,255)', 'rgb(255,99,71)'],
  });

  const backgroundStyles = {backgroundColor: boxInterpolation};

  return (
    <View style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={() => startFadeAnimation()}>
        <Animated.View style={[styles.square, {opacity: fade}]}></Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => startTranslateAnimation()}>
        <Animated.View
          style={[
            styles.square,
            {transform: [{translateY: translate}]},
          ]}></Animated.View>
      </TouchableWithoutFeedback> */}

      {/* <TouchableWithoutFeedback onPress={() => startScaleAnimation()}>
        <Animated.View style={[styles.square, {transform: [{scale: scale}]}]}>
          <Text>Hello from the other side</Text>
        </Animated.View>
      </TouchableWithoutFeedback> */}

      <TouchableWithoutFeedback onPress={() => startColorAnimation()}>
        <Animated.View style={[styles.square, backgroundStyles]}>
          <Animated.Text style={{color: colorInterpolation}}>
            Hello from the other side
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 200,
    height: 200,
    // backgroundColor: 'red',
  },
});

export default Deck;

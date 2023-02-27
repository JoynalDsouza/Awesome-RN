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
      toValue: -1,
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

      <TouchableWithoutFeedback onPress={() => startScaleAnimation()}>
        <Animated.View style={[styles.square, {transform: [{scaleY: scale}]}]}>
          <Text>Hello from the other side</Text>
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
    backgroundColor: 'red',
  },
});

export default Deck;

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
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startFadeAnimation()}>
        <Animated.View style={[styles.square, {opacity: fade}]}></Animated.View>
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

import React, {useRef, useState} from 'react';
import {View, PanResponder, StyleSheet, Animated} from 'react-native';

const App = () => {
  const boxPosition = useRef(new Animated.ValueXY()).current;
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  //   const handlePanResponderMove = Animated.event(
  //     [
  //       null,
  //       {
  //         dx: boxPosition.x,
  //         dy: boxPosition.y,
  //       },
  //     ],
  //     {useNativeDriver: false},
  //   );

  const handlePanResponderMove = (event, gestureState) => {
    const {dx, dy} = gestureState;
    const maxX = containerWidth - 100; // 100 is the width of the box
    const maxY = containerWidth - 100; // 100 is the height of the box
    console.log({containerWidth});
    let newX = boxPosition.x._value + dx;
    let newY = boxPosition.y._value + dy;

    if (newX < 0) {
      newX = 0;
    } else if (newX > maxX) {
      newX = maxX;
    }

    if (newY < 0) {
      newY = 0;
    } else if (newY > maxY) {
      newY = maxY;
    }

    console.log(newX);

    boxPosition.setValue({x: newX, y: newY});
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    }),
  ).current;

  const handleContainerLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View
      style={styles.container}
      ref={containerRef}
      onLayout={handleContainerLayout}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {translateX: boxPosition.x},
              //   {translateY: boxPosition.y},
            ],
          },
          containerWidth && {maxWidth: containerWidth},
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
  },
});

export default App;

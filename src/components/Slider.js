import React, {useMemo, useRef, useState, useEffect} from 'react';
import {View, Text, PanResponder, Animated, StyleSheet} from 'react-native';

const Slider = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  // const containerHeight = 411;
  const containerWidthRef = useRef(containerWidth);
  const pan = useState(new Animated.ValueXY())[0];

  // const containerCheck = (val)

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      //   onPanResponderMove: (event, gestureState) => {
      //     const {dx, dy} = gestureState;
      //     // console.log(dx);
      //     // console.log(containerWidthRef.current);
      //     const {x, y} = pan.__getValue();
      //     let nextX = x + dx;

      //     if (nextX < 0) {
      //       nextX = 0;
      //     } else if (nextX > containerWidthRef.current - 50) {
      //       nextX = containerWidthRef.current - 50;
      //     }

      //     // if (nextY < 0) {
      //     //   nextY = 0;
      //     // } else if (nextY > containerHeight - 50) {
      //     //   nextY = containerHeight - 50;
      //     // }

      //     pan.setValue({x: nextX, y: 0});
      //   },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  React.useEffect(() => {
    containerWidthRef.current = containerWidth;
  }, [containerWidth]);

  // panResponder.onPanResponderMove = (evt, gestureState) => {
  //   console.log({ containerWidth });
  // };

  // const [panResponder, setPanResponder] = useState(pan);

  const backgroundColorInterpolate = pan.x.interpolate({
    inputRange: [0, 100, 200, 300, 400],
    outputRange: [
      'rgba(247, 103, 103, 1)',
      'rgba(235, 185, 5, 1)',
      'rgba(74, 113, 255, 1)',
      'rgba(156, 12, 255, 1)',
      'rgba(52, 172, 85, 1)',
    ],
    // extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 50,
          // backgroundColor: "gray",
          position: 'relative',
          zIndex: 2,
        }}
        onLayout={e => {
          const {width} = e.nativeEvent.layout;
          setContainerWidth(width);
          // console.log({ width });
        }}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: backgroundColorInterpolate,
              position: 'absolute',
            },
            pan.getLayout(),
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 40,
    width: 50,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default Slider;

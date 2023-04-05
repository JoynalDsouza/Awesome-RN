import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Text, PanResponder} from 'react-native';
import Deck from '../components/Deck';
import Slider from '../components/Slider';
import {FeedbackModalize} from '../components/Slider3';
import SliderSvg from '../components/svg/SliderSvg';

const AnimationScreen = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerWidthRef = useRef(containerWidth);
  const pan = useState(new Animated.ValueXY())[0];
  const [rating, setRating] = useState(1);

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
      onPanResponderMove: (event, gestureState) => {
        const {dx, dy} = gestureState;

        pan.setValue({x: dx, y: 0});
      },

      onPanResponderRelease: () => {
        const {x, y} = pan.__getValue();
        console.log(x);
        if (x > 300) {
          setRating(5);
        } else if (x > 200) {
          setRating(4);
        } else if (x > 100) {
          setRating(3);
        } else if (x > 50) {
          setRating(2);
        } else {
          setRating(1);
        }
        pan.flattenOffset();
      },
    }),
  )[0];

  React.useEffect(() => {
    containerWidthRef.current = containerWidth;
  }, [containerWidth]);

  const DATA = [
    {
      id: 1,
      text: 'Card #1',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
      id: 2,
      text: 'Card #2',
      uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
      id: 3,
      text: 'Card #3',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
      id: 4,
      text: 'Card #4',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
    {
      id: 5,
      text: 'Card #5',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
      id: 6,
      text: 'Card #6',
      uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
      id: 7,
      text: 'Card #7',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
      id: 8,
      text: 'Card #8',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
  ];

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
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {/* <Ball /> */}
      {/* <Deck /> */}

      <View
        style={{
          backgroundColor: 'yellow',
          alignItems: 'center',
          height: 24,
          justifyContent: 'center',
          position: 'relative',
          marginVertical: 10,
        }}>
        <Animated.View
          style={{position: 'absolute', opacity: rating === 1 ? 1 : 0}}>
          <Text>Hello</Text>
        </Animated.View>
        <Animated.View
          style={{position: 'absolute', opacity: rating === 2 ? 1 : 0}}>
          <Text>World</Text>
        </Animated.View>
        <Animated.View
          style={{position: 'absolute', opacity: rating === 3 ? 1 : 0}}>
          <Text>oP</Text>
        </Animated.View>
        <Animated.View
          style={{position: 'absolute', opacity: rating === 4 ? 1 : 0}}>
          <Text>LeagueX</Text>
        </Animated.View>
        <Animated.View
          style={{position: 'absolute', opacity: rating === 5 ? 1 : 0}}>
          <Text>Champion</Text>
        </Animated.View>
      </View>

      <Slider />

      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 50,
            position: 'relative',
            zIndex: 2,
          }}
          onLayout={e => {
            const {width} = e.nativeEvent.layout;
            setContainerWidth(width);
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
            {...panResponder.panHandlers}></Animated.View>
        </View>
      </View>

      <FeedbackModalize />
    </View>
  );
};

export default AnimationScreen;

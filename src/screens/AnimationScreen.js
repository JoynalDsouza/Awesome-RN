import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import Deck from '../components/Deck';
// import Ball from '../components/Ball';

const AnimationScreen = () => {
  //  const moveBall = useRef(new Animated.ValueXY(0, 0)).current;

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

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {/* <Ball /> */}
      <Deck />
    </View>
  );
};

export default AnimationScreen;

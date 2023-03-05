import React, {useState} from 'react';
import {View, Text, PanResponder} from 'react-native';

export const RatingSlider = () => {
  const [rating, setRating] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const ratingPercentage = (gestureState.moveX / 250) * 100;

      const newRating = Math.min(ratingPercentage, 100); // Limit the rating to 100% maximum
      const maxRating = 50; // Set the maximum rating to 5
      const rating = Math.ceil((newRating / 100) * maxRating); // Calculate the rating based on the percentage and round it up to the nearest integer
      setRating(rating);
    },

    onPanResponderRelease: () => {
      // Save the rating to the state
      // ...
    },
  });

  return (
    <View
      style={{
        backgroundColor: 'lightgray',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}
      {...panResponder.panHandlers}>
      <View
        style={{
          backgroundColor: 'blue',
          height: 40,
          borderRadius: 20,
          width: `${rating}%`,
        }}
      />
    </View>
  );
};

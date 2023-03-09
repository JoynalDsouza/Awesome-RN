import React, {useState, useRef, useCallback} from 'react';
import {View, Text, PanResponder, Animated} from 'react-native';

const PlaceHolderRateMarks = ({width = 4, height = 8, addHeight, style}) => {
  return (
    <View
      style={[
        {
          width: width,
          height: addHeight ? 12 : height,
          borderRadius: 4,
          backgroundColor: 'rgb(255, 255, 255)',
          opacity: 0.5,
        },
        style,
      ]}></View>
  );
};

const FeedbackModalize = ({feedbackModalizeRef, userData = {}}) => {
  const [pan, setPan] = useState(new Animated.Value(0));

  const [rating, setRating] = useState(1);

  const ratingBarViewWidth = useRef(0);
  const sliderPosition = useRef(0);

  const [sliderClicked, setSliderClicked] = useState(false);

  const ratingBarPosition = useRef([]);

  const moveRatingSlider = useCallback(
    dx => {
      const sliderPositionValue =
        ratingBarPosition.current[sliderPosition.current];

      if (
        dx + sliderPositionValue > 0 &&
        dx + sliderPositionValue < ratingBarPosition.current[4]
      ) {
        pan.setValue(dx + sliderPositionValue);
      }
    },
    [ratingBarViewWidth],
  );

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setSliderClicked(true);
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        const {dx, dy} = gestureState;
        moveRatingSlider(dx);
      },

      onPanResponderRelease: () => {
        const closestRatingBarPosition = findClosestNumber(
          ratingBarPosition.current,
          pan.__getValue(),
        );
        const ratingValue =
          ratingBarPosition.current.indexOf(closestRatingBarPosition) + 1;

        setRating(ratingValue);
        sliderPosition.current = ratingValue - 1;

        pan.setValue(closestRatingBarPosition - 8);
      },
    }),
  )[0];

  const backgroundColorInterpolate = pan.interpolate({
    inputRange: [
      0,
      ratingBarViewWidth.current * 0.25,
      ratingBarViewWidth.current * 0.5,
      ratingBarViewWidth.current * 0.75,
      ratingBarViewWidth.current,
    ],
    outputRange: [
      'rgba(247, 103, 103, 1)',
      'rgba(235, 185, 5, 1)',
      'rgba(74, 113, 255, 1)',
      'rgba(156, 12, 255, 1)',
      'rgba(52, 172, 85, 1)',
    ],
    // extrapolate: 'clamp',
  });

  const backgroundColor = {
    1: 'rgba(247, 103, 103, 1)',
    2: 'rgba(235, 185, 5, 1)',
    3: 'rgba(74, 113, 255, 1)',
    4: 'rgba(156, 12, 255, 1)',
    5: 'rgba(52, 172, 85, 1)',
  };

  return (
    <View>
      {/* <View style={{ position: "absolute", zIndex: 1, alignSelf: "center" }}>
            <Trapezoid />
          </View> */}
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 24,
          paddingBottom: 36,
          // backgroundColor: "rgba(156, 12, 255, 1)",
          backgroundColor: sliderClicked
            ? backgroundColorInterpolate
            : 'rgba(60, 65, 90, 1)',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        <Text>{rating}</Text>
      </Animated.View>

      <View style={{position: 'relative', bottom: 40}}>
        <Animated.View
          style={[
            {
              marginVertical: 24,
              marginLeft: 12,
              marginRight: 12,
              height: 20,
              flex: 1,
            },
          ]}>
          <Animated.View
            style={[
              {
                width: 60,
                height: 60,
                // backgroundColor: backgroundColorInterpolate,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                transform: [{translateX: pan}],
                borderRadius: 30,
                backgroundColor: 'rgba(37, 41, 61, 1)',
              },
            ]}
            {...panResponder.panHandlers}>
            <Animated.View
              style={{
                backgroundColor: sliderClicked
                  ? backgroundColorInterpolate
                  : 'rgba(244, 244, 244, 0.7)',
                height: 48,
                width: 48,
                borderRadius: 24,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PlaceHolderRateMarks
                height={22}
                width={3}
                style={{opacity: 1}}></PlaceHolderRateMarks>
              <PlaceHolderRateMarks
                height={22}
                width={3}
                style={{
                  marginHorizontal: 4,
                  opacity: 1,
                }}></PlaceHolderRateMarks>

              <PlaceHolderRateMarks
                height={22}
                width={3}
                style={{opacity: 1}}></PlaceHolderRateMarks>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <View
          style={{
            marginHorizontal: 36,
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onLayout={e => {
            const viewWidth = e.nativeEvent.layout.width;
            ratingBarViewWidth.current = viewWidth;

            ratingBarPosition.current[0] = 0;
            ratingBarPosition.current[1] = viewWidth * 0.25;
            ratingBarPosition.current[2] = viewWidth * 0.5;
            ratingBarPosition.current[3] = viewWidth * 0.75;
            ratingBarPosition.current[4] = viewWidth;
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setRating(1);
              sliderPosition.current = 1;

              pan.setValue(ratingBarPosition.current[0] - 8);
            }}>
            <View
              style={{
                width: 6,
                height: 18,
                borderRadius: 4,
                backgroundColor: 'rgb(255, 255, 255)',
                opacity: rating === 1 ? 1 : 0.5,
              }}></View>
          </TouchableWithoutFeedback>
          <PlaceHolderRateMarks addHeight={rating > 3} />
          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <TouchableWithoutFeedback
            onPress={() => {
              setRating(2);
              sliderPosition.current = 2;

              pan.setValue(ratingBarPosition.current[1] - 8);
            }}>
            <View
              style={{
                width: 6,
                height: 22,
                borderRadius: 4,
                backgroundColor: 'rgb(255, 255, 255)',
                opacity: rating === 2 ? 1 : 0.5,
              }}></View>
          </TouchableWithoutFeedback>
          <PlaceHolderRateMarks addHeight={rating > 3} />
          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <TouchableWithoutFeedback
            onPress={() => {
              setRating(3);
              sliderPosition.current = 3;

              pan.setValue(ratingBarPosition.current[2] - 8);
            }}>
            <View
              style={{
                width: 6,
                height: 28,
                borderRadius: 4,
                backgroundColor: 'rgb(255, 255, 255)',
                opacity: rating === 3 ? 1 : 0.5,
              }}></View>
          </TouchableWithoutFeedback>
          <PlaceHolderRateMarks addHeight={rating > 3} />
          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <TouchableWithoutFeedback
            onPress={() => {
              setRating(4);
              sliderPosition.current = 4;

              pan.setValue(ratingBarPosition.current[3] - 8);
            }}>
            <View
              style={{
                width: 6,
                height: 32,
                borderRadius: 4,
                backgroundColor: 'rgb(255, 255, 255)',
                opacity: rating === 4 ? 1 : 0.5,
              }}></View>
          </TouchableWithoutFeedback>

          <PlaceHolderRateMarks addHeight={rating > 3} />
          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <PlaceHolderRateMarks addHeight={rating > 3} />

          <TouchableWithoutFeedback
            onPress={() => {
              setRating(5);
              sliderPosition.current = 5;

              pan.setValue(ratingBarPosition.current[4] - 8);
            }}>
            <View
              style={{
                width: 6,
                height: 44,
                borderRadius: 4,
                backgroundColor: 'rgb(255, 255, 255)',
                opacity: rating === 5 ? 1 : 0.5,
              }}></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

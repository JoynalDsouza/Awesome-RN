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

const Trapezoid = () => {
  return <View style={styles.trapezoid} />;
};

const FeedbackModalize = ({feedbackModalizeRef, userData = {}}) => {
  const [pan, setPan] = useState(new Animated.Value(0));

  const [rating, setRating] = useState(1);

  const ratingBarViewWidth = useRef(0);
  const sliderPosition = useRef(0);

  const [showFeedbackReasons, setShowfeedbackReasons] = useState(false);

  const [sliderClicked, setSliderClicked] = useState(false);

  const ratingBarPosition = useRef([]);

  const feedbackReasons = [
    'Customer Support',
    'Payouts',
    'App Design',
    'Leagues',
    'App Speed',
    'Offers',
    'Withdraw',
  ];

  const [feedbackReasonsIndex, setFeedbackReasonsIndex] = useState([]);

  const rating1Animation = useRef(null);
  const rating2Animation = useRef(null);

  const rating3Animation = useRef(null);

  const rating4Animation = useRef(null);

  const rating5Animation = useRef(null);

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

  const submitRating = (rating, reasons = []) => {
    if (sliderClicked) {
      callAllEvents('feedback_rating', userData?.id, {
        userId: userData?.id,
        rating: rating,
        reasons: reasons,
        name: userData?.team_name,
        playstoreBuild: isPlaystoreBuild,
      });

      feedbackModalizeRef?.current?.close();
    }
  };

  return (
    <Modalize
      ref={feedbackModalizeRef}
      adjustToContentHeight={true}
      childrenStyle={{
        paddingBottom: 8,
        backgroundColor: 'rgba(37, 41, 61, 1)',
        // paddingTop: 16.
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}
      onClose={() => {
        setShowfeedbackReasons(false);
        setRating(1);
        setFeedbackReasonsIndex([]);
        setSliderClicked(false);
      }}
      handlePosition={'inside'}>
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
          <TextView smallBold fontSize={16} mb={8}>
            How much score will you give for us?
          </TextView>
          {/* <TextView h1>{rating}</TextView>  */}
          <View
            style={{
              width: 200,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* animation box */}
            {/* neutral */}
            {!sliderClicked && (
              <LottieLoader
                loop
                source={require('../../animations/feedback/feedback-neutral.json')}
              />
            )}

            {rating === 1 && sliderClicked && (
              <Lottie
                source={require('../../animations/feedback/feedback-1a.json')}
                loop={true}
                ref={rating1Animation}
                autoPlay={true}></Lottie>
            )}

            {rating === 2 && sliderClicked && (
              <Lottie
                source={require('../../animations/feedback/feedback-2a.json')}
                loop={true}
                ref={rating2Animation}
                autoPlay={true}></Lottie>
            )}

            {rating === 3 && sliderClicked && (
              <Lottie
                source={require('../../animations/feedback/feedback-3.json')}
                loop={true}
                autoPlay={true}
                ref={rating3Animation}></Lottie>
            )}

            {rating === 4 && sliderClicked && (
              <Lottie
                source={require('../../animations/feedback/feedback-4.json')}
                loop={true}
                autoPlay={true}
                ref={rating4Animation}></Lottie>
            )}

            {rating === 5 && sliderClicked && (
              <Lottie
                source={require('../../animations/feedback/feedback-5.json')}
                loop={true}
                ref={rating5Animation}
                autoPlay={true}></Lottie>
            )}
          </View>
          {!sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                move the slider
              </TextView>
              <TextView>👇</TextView>
            </View>
          )}

          {rating === 1 && sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                oh no! that’s
              </TextView>

              <TextView h1>OUT!</TextView>
            </View>
          )}

          {rating === 2 && sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                not bad! that’s a
              </TextView>

              <TextView h1>Single</TextView>
            </View>
          )}

          {rating === 3 && sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                keep it up! it’s a
              </TextView>

              <TextView h1>Double</TextView>
            </View>
          )}

          {rating === 4 && sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                wow! a great
              </TextView>

              <TextView h1>Boundary</TextView>
            </View>
          )}

          {rating === 5 && sliderClicked && (
            <View style={{alignItems: 'center'}}>
              <TextView opacity={0.6} mt={8} mb={4}>
                that’s a splendid
              </TextView>

              <TextView h1>Six</TextView>
            </View>
          )}
        </Animated.View>

        {!showFeedbackReasons && (
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
                {/* <Icon
                  name={sliderMover}
                  width={100}
                  height={"100%"}
                  // fillColor={"red"}
                ></Icon> */}
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

              {/* <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              /> */}
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
              {/* <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              /> */}
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
              {/* <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              /> */}
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
              {/* <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              />
              <PlaceHolderRateMarks
                addHeight={pan.__getValue() >= ratingBarPosition.current[3]}
              /> */}
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
        )}

        {showFeedbackReasons && (
          <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <View>
              <TextView smallBold>
                Please tell us where we should practice! 👇
              </TextView>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 12,
                marginTop: 10,
              }}>
              {feedbackReasons.map((reason, index) => {
                const selected = feedbackReasonsIndex?.includes(index);
                return (
                  <TouchableOpacity
                    style={{
                      marginRight: 6,
                      paddingBottom: 5,
                      paddingTop: 4,
                      paddingHorizontal: 6,
                      borderWidth: 1,
                      borderColor: selected
                        ? backgroundColor[rating]
                        : 'rgba(255, 255, 255, 0.8)',
                      marginBottom: 6,
                      borderRadius: 4,
                      backgroundColor: selected
                        ? backgroundColor[rating]
                        : 'rgba(45, 50, 74, 1)',
                    }}
                    onPress={() => {
                      let feedbackIndex;
                      if (!selected) {
                        feedbackIndex = [...feedbackReasonsIndex, index];
                      } else {
                        feedbackIndex = feedbackReasonsIndex.filter(function (
                          item,
                        ) {
                          return item !== index;
                        });
                      }
                      setFeedbackReasonsIndex(feedbackIndex);
                    }}>
                    <View>
                      <TextView
                        smallBold={selected ? true : false}
                        fontSize={14}>
                        {reason}
                      </TextView>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 16}}>
          <TouchableOpacity
            onPress={() => {
              feedbackModalizeRef?.current?.close();
            }}>
            <View
              style={{
                height: 38,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderWidth: 1,
                paddingHorizontal: 24,
                marginRight: 12,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                marginBottom: 12,
              }}>
              <TextView btnLight textTransform={'uppercase'}>
                Close
              </TextView>
            </View>
          </TouchableOpacity>

          {!showFeedbackReasons && (
            <TouchableOpacity
              style={{flex: 1}}
              // disabled={!sliderClicked}
              onPress={() => {
                if (sliderClicked) {
                  if (rating >= 4) {
                    if (isPlaystoreBuild) {
                      triggerAppRatingPopUp();
                    }
                    submitRating(rating, []);
                  } else {
                    setShowfeedbackReasons(true);
                  }
                }
              }}>
              <View
                style={{
                  height: 38,
                  backgroundColor: primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TextView textTransform={'uppercase'} btnLight>
                  Give Score
                </TextView>
              </View>
            </TouchableOpacity>
          )}

          {showFeedbackReasons && (
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                const feedbackReasonArray = [];
                feedbackReasonsIndex.map(index =>
                  feedbackReasonArray.push(feedbackReasons[index]),
                );

                submitRating(rating, feedbackReasonArray);
              }}>
              <View
                style={{
                  height: 38,
                  backgroundColor: primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TextView textTransform={'uppercase'} btnLight>
                  Submit
                </TextView>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modalize>
  );
};

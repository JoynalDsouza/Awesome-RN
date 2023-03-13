import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AnimationScreen from './src/screens/AnimationScreen';
import AnimationScreen2 from './src/screens/AnimationScreen2';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
        <Stack.Screen name="Animation2" component={AnimationScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './Components/RootStack';
import {HomeScreen} from './Components/HomeScreen';
import {DetailsScreen} from './Components/DetailsScreen';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <RootStack.Screen name="Lista Kroków" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

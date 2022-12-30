/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './Components/RootStack';
import {HomeScreen} from './Components/HomeScreen';
import {DetailsScreen} from './Components/DetailsScreen';
import BleManager from 'react-native-ble-manager';
import {LoadingScreen} from './Components/LoadingScreen';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {useBLE} from './Tools/useBLE';

export default function App() {
  const sensorsConnected = useBLE();
  return sensorsConnected.length < 3 ? (
    <LoadingScreen sensorsConnected={sensorsConnected.length} />
  ) : (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <RootStack.Screen name="Lista Kroków" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

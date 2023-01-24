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
import {BLEProvider, useBLEContext} from './Tools/bleProvider';

function Main() {
  const sensorNumber = useBLEContext().sensorNumber;
  return sensorNumber < 3 ? (
    <LoadingScreen sensorsConnected={sensorNumber} />
  ) : (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <RootStack.Screen name="Lista Kroków" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <BLEProvider>
      <Main />
    </BLEProvider>
  );
}

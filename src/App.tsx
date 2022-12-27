/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './Components/RootStack';
import {HomeScreen} from './Components/HomeScreen';
import {DetailsScreen} from './Components/DetailsScreen';
import BleManager from 'react-native-ble-manager';

export default function App() {
  useEffect(() => {
    BleManager.start({showAlert: false}).then(() => {
      // Success code
      console.log('Module initialized');
    });
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <RootStack.Screen name="Lista Kroków" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

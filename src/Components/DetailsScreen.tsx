/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Image} from 'react-native';
import {RootStackParamList} from './RootStack';
import {useBLEContext} from '../Tools/bleProvider';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Lista Kroków'
>;
export function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId} = route.params;
  const sensorsConnected = useBLEContext().sensorsConnected;
  const [steps, setSteps] = useState<Array<string> | null>(null);

  useEffect(() => {
    let i = 0;
    for (let sensor of sensorsConnected) {
      if ((sensor.x != null, sensor.y != null, sensor.getDistance() != null)) {
        i += 1;
      }
    }

    if (i >= 3) {
      setSteps(['Dupaaaaa']);
    }
  }, [sensorsConnected]);
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Image source={require('./images/logo.png')} />
      <Text style={{fontSize: 30, color: 'black'}}>
        {' '}
        Żeby dostać się do: {itemId}
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>{steps}</Text>
    </View>
  );
}

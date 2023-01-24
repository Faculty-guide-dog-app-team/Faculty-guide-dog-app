/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Image} from 'react-native';
import {RootStackParamList} from './RootStack';
import {useBLEContext} from '../Tools/bleProvider';
import {find_door} from '../dijkstra';
import {grid} from '../navigation';
import {createInstructions} from '../step_generator';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Lista Kroków'
>;
export function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId} = route.params;
  const X = useBLEContext().X;
  const Y = useBLEContext().Y;
  const [steps, setSteps] = useState<Array<string> | null>(null);

  useEffect(() => {
    const door = find_door(itemId, grid);
    if (door == null) {
      setSteps(['Nie ma takiej sali. Spróbuj ponownire.']);
    } else if (X == null || Y == null) {
      setSteps(['Lokalizowanie...']);
    } else {
      const location = [Math.ceil(Y), Math.ceil(X)];
      const instructions = createInstructions(
        grid,
        location as [number, number],
        door.coordinates as [number, number],
      );
      setSteps(instructions);
    }
  }, [itemId, X, Y]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
      }}>
      <Image source={require('./images/logo.png')} />
      <Text style={{fontSize: 30, color: 'black'}}>
        {' '}
        Żeby dostać się do: {itemId}
      </Text>
      {steps?.map((instruction, i) => (
        <Text key={i} style={{fontSize: 23, flexWrap: 'wrap'}}>
          {i + 1}. {instruction}
        </Text>
      ))}
    </View>
  );
}

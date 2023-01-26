/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Image} from 'react-native';
import {RootStackParamList} from './RootStack';
import {useBLEContext} from '../Tools/bleProvider';
import {find_door} from '../Tools/dijkstra';
import {grid} from '../Tools/navigation';
import {createInstructions} from '../Tools/step_generator';

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
    let update = () => {
      console.log('update');
      const door = find_door(itemId, grid);
      if (door == null) {
        setSteps(['Nie ma takiej sali. Spróbuj ponownie.']);
      } else if (X == null || Y == null) {
        setSteps(['Lokalizowanie...']);
      } else {
        const location = [Math.round(Y), Math.round(X)];
        let instructions: Array<string> = [];
        try {
          instructions = createInstructions(
            grid,
            [-26, 25],
            door.coordinates as [number, number],
          );
        } catch (e) {
          if (e instanceof TypeError) {
            instructions = [
              'Nieprawidłowa lokalizacja',
              String(location[0]),
              String(location[1]),
            ];
          }
        }
        setSteps(instructions);
      }
    };

    const interval = setInterval(update, 500);

    return () => {
      clearInterval(interval);
    };
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

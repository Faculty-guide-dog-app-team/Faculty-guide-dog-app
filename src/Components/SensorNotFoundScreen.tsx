/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native';
import {RootStackParamList} from './RootStack';

type SensorNotFoundProps = NativeStackScreenProps<
  RootStackParamList,
  'Czujnik nie wykryty'
>;
export function SensorNotFoundScreen({navigation}: SensorNotFoundProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor:'white', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color:'black'}}> Czujnik nie wykryty</Text>
      <Button
        
        title="Skanuj ponownie"
      />
    </View>
  );
}

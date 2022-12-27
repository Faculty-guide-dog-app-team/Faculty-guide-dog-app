/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {RootStackParamList} from './RootStack';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Lista Kroków'
>;
export function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}> Żeby dostać się do: {itemId}</Text>
      <Text style={{fontSize: 30}}> Kroki</Text>
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {RootStackParamList} from './RootStack';

type ErrorProps = NativeStackScreenProps<
  RootStackParamList,
  'Błąd'
>;
export function ErrorScreen({navigation}: ErrorProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor:'white', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color:'black'}}> Wystąpił błąd</Text>
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {RootStackParamList} from './RootStack';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Wpisywanie Celu'
>;

export function HomeScreen({navigation}: HomeScreenProps) {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{fontSize: 30, margin: 10}}
        multiline={true}
        placeholder="Wprowadź numer sali, do której chcesz się dostać"
        onSubmitEditing={() =>
          navigation.navigate('Lista Kroków', {itemId: text})
        }
        onChangeText={txt => setText(txt)}
      />
    </View>
  );
}

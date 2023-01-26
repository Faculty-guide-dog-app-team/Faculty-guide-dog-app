/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, TextInput, Image} from 'react-native';
import {RootStackParamList} from './RootStack';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Wpisywanie Celu'
>;

export function HomeScreen({navigation}: HomeScreenProps) {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Image source={require('./images/logo.png')} />
      <TextInput
        style={{fontSize: 30, margin: 10, color: 'black', textAlign: 'center'}}
        multiline={true}
        placeholder="Wprowadź numer sali, do której chcesz się dostać"
        placeholderTextColor={'gray'}
        blurOnSubmit={true}
        onSubmitEditing={() =>
          navigation.navigate('Lista Kroków', {itemId: text})
        }
        onChangeText={txt => setText(txt)}
      />
    </View>
  );
}

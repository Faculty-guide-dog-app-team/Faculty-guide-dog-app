/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

type RootStackParamList = {
  'Wpisywanie Celu': undefined;
  'Lista Kroków': {itemId: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Wpisywanie Celu'
>;
function HomeScreen({navigation}: HomeScreenProps) {
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

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Lista Kroków'
>;
function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}> Żeby dostać się do: {itemId}</Text>
      <Text style={{fontSize: 30}}> Kroki</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <RootStack.Screen name="Lista Kroków" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

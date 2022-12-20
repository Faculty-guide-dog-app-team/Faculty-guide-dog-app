import  React, {useState } from 'react';
import { Text, View, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation }) {
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <TextInput
                style= {{fontSize : 30, margin: 10}}
                multiline={true}
                placeholder='Wprowadź numer sali, do której chcesz się dostać'
                onSubmitEditing = {()=> navigation.navigate('Lista Kroków', {itemId: text})}
                onChangeText={(text) => setText(text)}
      />            
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style= {{fontSize : 30}} > Żeby dostać się do: {itemId}</Text>
      <Text style= {{fontSize : 30}} > Kroki</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Wpisywanie Celu" component={HomeScreen} />
        <Stack.Screen name="Lista Kroków" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

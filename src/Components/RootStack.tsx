import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  'Wpisywanie Celu': undefined;
  'Czujnik nie wykryty': undefined;
  'Błąd': undefined;
  'Lista Kroków': {itemId: string};
};

export const RootStack = createStackNavigator<RootStackParamList>();

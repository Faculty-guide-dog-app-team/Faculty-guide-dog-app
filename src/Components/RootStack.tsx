import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  'Wpisywanie Celu': undefined;
  'Lista Kroków': {itemId: string};
};

export const RootStack = createStackNavigator<RootStackParamList>();

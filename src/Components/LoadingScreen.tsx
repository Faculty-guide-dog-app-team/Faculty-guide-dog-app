/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

interface LoadingScreenProps {
  sensorsConnected: number;
}

export function LoadingScreen(props: LoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Łączenie z czujnikami
      </Text>
      <ActivityIndicator size="large" />
      <Text
        style={{
          textAlign: 'center',
        }}>
        Połączono: {props.sensorsConnected}/3
      </Text>
    </View>
  );
}

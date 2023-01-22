/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Sensor} from '../Tools/Sensor';

interface LoadingScreenProps {
  sensorsConnected: Array<Sensor>;
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
        Połączono: {props.sensorsConnected.length}/3
      </Text>
      {props.sensorsConnected.map((sensor, i) => (
        <Text
          style={{
            textAlign: 'center',
          }}
          key={i}>
          ({sensor.x}, {sensor.y}): {sensor.getDistance()}
        </Text>
      ))}
    </View>
  );
}

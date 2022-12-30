/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {enableBLEAndroid} from './BLE';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {Sensor} from './Sensor';
import {NativeEventEmitter, NativeModules} from 'react-native';

const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

export const useBLE = () => {
  const [sensorsConnected, setSensorsConnected] = useState<Array<Sensor>>([]);
  const [pendingConnections, setPendingConnections] = useState<Array<Sensor>>(
    [],
  );

  function handleDiscovery(peripheral: Peripheral) {
    console.log(peripheral);
    if (pendingConnections.length + sensorsConnected.length >= 3) {
      return;
    }

    let newSensor = new Sensor(peripheral);
    BleManager.connect(peripheral.id).then(() => {
      setSensorsConnected(curret => [...curret, newSensor]);
      setPendingConnections(current =>
        current.filter(sensor => sensor !== newSensor),
      );
    });

    setPendingConnections(current => [...current, newSensor]);
  }

  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', peripheral => {
    handleDiscovery(peripheral);
  });

  bleManagerEmitter.addListener('BleManagerStopScan', () => {
    console.log('Scan stopped');
  });

  useEffect(() => {
    if (!enableBLEAndroid()) {
      // Try again screen
      return;
    }

    BleManager.start({showAlert: false}).then(() => {
      console.log('Module initialized');

      BleManager.scan(['6951f9c0-2375-49f5-8da9-f45c9f067dcb'], 5).then(() => {
        console.log('Scan started');
      });
    });
  }, []);

  return sensorsConnected;
};

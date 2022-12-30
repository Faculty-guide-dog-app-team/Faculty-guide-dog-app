/* eslint-disable @typescript-eslint/no-unused-vars */
import {AdvertisingData, Peripheral} from 'react-native-ble-manager';

export class Sensor implements Peripheral {
  rssi: number;
  id: string;
  name?: string | undefined;
  advertising: AdvertisingData;
  constructor(peripheral: Peripheral) {
    this.id = peripheral.id;
    this.rssi = peripheral.rssi;
    this.name = peripheral.name;
    this.advertising = peripheral.advertising;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {Buffer} from 'buffer';
import BleManager, {
  AdvertisingData,
  Peripheral,
} from 'react-native-ble-manager';

const SENSOR_UPDATE_INTERVAL_MS = 1000;
export const RSSI_THRESHOLD = -90;
const LOCTION_SHATING_SERVICE = '6951f9c0-2375-49f5-8da9-f45c9f067dcb';
const X_CHARACTERISTIC_UUID = '8eeec66e-71ce-11ed-a1eb-0242ac120002';
const Y_CHARACTERISTIC_UUID = '74e7237c-71d0-11ed-a1eb-0242ac120002';

const ONE_METER_RRSI = -60;
const N = 3;

export class Sensor implements Peripheral {
  rssi: number;
  id: string;
  name?: string | undefined;
  advertising: AdvertisingData;
  updateHandle: number | null;
  x: number | null;
  y: number | null;
  updateFrontend: () => void;
  constructor(peripheral: Peripheral, updateFunction: () => void) {
    this.id = peripheral.id;
    this.rssi = peripheral.rssi;
    this.name = peripheral.name;
    this.advertising = peripheral.advertising;
    this.updateHandle = null;
    this.x = null;
    this.y = null;
    this.updateFrontend = updateFunction;
  }

  private update() {
    BleManager.readRSSI(this.id)
      .then((value: unknown) => {
        this.rssi = value as number;
        this.updateFrontend();
        if (this.rssi < RSSI_THRESHOLD) {
          this.disconnect();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  public startListening() {
    //Read the location
    BleManager.retrieveServices(this.id).then(() => {
      BleManager.read(this.id, LOCTION_SHATING_SERVICE, Y_CHARACTERISTIC_UUID)
        .then((data: any) => {
          const buffer = Buffer.from(data);
          const value = buffer.readIntLE(0, 4);
          this.y = value;
          this.updateFrontend();
        })
        .catch(error => {
          console.error(error);
        });
      BleManager.read(this.id, LOCTION_SHATING_SERVICE, X_CHARACTERISTIC_UUID)
        .then((data: any) => {
          const buffer = Buffer.from(data);
          const value = buffer.readIntLE(0, 4);
          this.x = value;
          this.updateFrontend();
        })
        .catch(error => {
          console.error(error);
        });
    });

    this.updateHandle = setInterval(
      this.update.bind(this),
      SENSOR_UPDATE_INTERVAL_MS,
    );
  }

  public getDistance() {
    if (this.rssi == null) {
      return null;
    }
    return Math.pow(10, (ONE_METER_RRSI - this.rssi) / (10 * N));
  }

  public disconnect() {
    BleManager.disconnect(this.id);
  }

  public destroy() {
    if (this.updateHandle !== null) {
      clearInterval(this.updateHandle);
    }
  }
}

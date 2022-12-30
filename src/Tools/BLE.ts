import {Platform, PermissionsAndroid} from 'react-native';

export function enableBLEAndroid() {
  let BLEenabled = true;
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(res => {
          if (res) {
            console.log('User accept');
          } else {
            console.log('User refuse');
            BLEenabled = false;
          }
        });
      }
    });
  }
  return BLEenabled;
}

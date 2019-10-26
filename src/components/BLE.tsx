import * as React from 'react';
import { View, Text, NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', peripheral => {
  console.log('PERIPHERAL: ', peripheral);
});

const BLE = () => {
  React.useEffect(() => {
    BleManager.start({ showAlert: true })
      .then(() => {
        BleManager.scan([], 15)
          .then(() => {
            console.log('SCANNING');
          })
          .catch(() => {
            console.log('ERROR OCCURRED:');
          });
      })
      .catch(() => {
        console.log('FAILED TO START');
      });

    BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
      console.log('Connected peripherals: ' + peripheralsArray.length);
    });
    return () => {
      BleManager.stopScan();
    };
  });

  return (
    <View>
      <Text>BLE</Text>
    </View>
  );
};

export default BLE;

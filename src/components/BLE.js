"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_ble_manager_1 = require("react-native-ble-manager");
var BleManagerModule = react_native_1.NativeModules.BleManager;
var bleManagerEmitter = new react_native_1.NativeEventEmitter(BleManagerModule);
bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', function (peripheral) {
    console.log('PERIPHERAL: ', peripheral);
});
var BLE = function () {
    React.useEffect(function () {
        react_native_ble_manager_1.default.start({ showAlert: true })
            .then(function () {
            react_native_ble_manager_1.default.scan([], 15)
                .then(function () {
                console.log('SCANNING');
            })
                .catch(function () {
                console.log('ERROR OCCURRED:');
            });
        })
            .catch(function () {
            console.log('FAILED TO START');
        });
        react_native_ble_manager_1.default.getConnectedPeripherals([]).then(function (peripheralsArray) {
            console.log('Connected peripherals: ' + peripheralsArray.length);
        });
        return function () {
            react_native_ble_manager_1.default.stopScan();
        };
    });
    return (<react_native_1.View>
      <react_native_1.Text>BLE</react_native_1.Text>
    </react_native_1.View>);
};
exports.default = BLE;

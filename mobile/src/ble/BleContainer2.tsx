import * as React from 'react';
import { View } from 'native-base';
import { BleManager, Device } from 'react-native-ble-plx';
import { connect } from 'react-redux';
import {
  scanStart,
  scanFailed,
  connectStart,
  connectSuccess,
  connectFailed
} from '../store/ble/actions';
import { AppState } from 'react-native';
import Buffer from 'buffer';
import { decode as atob, encode as btoa } from 'base-64';
import { firebase } from '@react-native-firebase/analytics';

const ARGOS_SERVICE_UUID = 'E4CC0001-2A2A-B481-E9A1-7185D4BC7DB6';
const LOG_GROUP_BLE_CONTAINER = 'ble-container';
const LOG_GROUP_KEY_BLE_CONTAINER_APP_STATE_CHANGE = 'app-state-change';

interface Logger {
  info: (group: string, key: string, message?: string) => void;
}

function makeLogger(): Logger {
  return {
    info: (group, key, message) => {
      console.log(`${group} ${key}: ${message || 'no message.'}`);
      firebase.analytics().logEvent(`some_event`, {
        message: message || 'n/'
      });
    }
  };
}

const manager = new BleManager();

function scan(manager: BleManager, serviceUUID: string, logger: Logger) {
  return new Promise<Device>((res, rej) => {
    logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_begin');
    manager.startDeviceScan([serviceUUID], {}, (error, device) => {
      if (error) {
        logger.info(
          LOG_GROUP_BLE_CONTAINER,
          'scan_error',
          `Code: ${error.errorCode}. Reason: ${error.reason}`
        );
        rej(error);
        return;
      }

      if (!device) {
        logger.info(
          LOG_GROUP_BLE_CONTAINER,
          'scan_device_null',
          'Device is null. Continue scanning...'
        );
      }

      if (device) {
        logger.info(
          LOG_GROUP_BLE_CONTAINER,
          'scan_device_found',
          `Device ID: ${device.id}`
        );
        manager.stopDeviceScan();
        logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_stopped');
        res(device);
        return;
      }
    });
  });
}

function connectToDevice(manager: BleManager, id: string, logger: Logger) {
  return new Promise<Device>(async (res, rej) => {
    try {
      logger.info(
        LOG_GROUP_BLE_CONTAINER,
        'connect_start',
        `Connecting to device ${id}`
      );
      const device = await manager.connectToDevice(id, { timeout: 3000 });
      logger.info(
        LOG_GROUP_BLE_CONTAINER,
        'connect_success',
        `Connected to device ${device.id}`
      );

      res(device);
    } catch (error) {
      logger.info(
        LOG_GROUP_BLE_CONTAINER,
        'connect_error',
        `Failed to connect to device ${id}. Error: ${error}`
      );
      rej(error);
    }
  });
}

interface Callbacks {
  onScanStart: () => void;
  onScanError: (message: string) => void;
  onConnectStart: () => void;
  onConnectSuccess: (deviceId: string) => void;
  onConnectError: (message: string) => void;
}

const onValueListeners: { [key: string]: (value: Int16Array) => void } = {};
export function addOnValueListener(cb: (value: Int16Array) => void) {
  const id = Object.keys(onValueListeners).length;
  onValueListeners[id] = cb;
  return function remove() {
    delete onValueListeners[id];
  };
}

async function listen(manager: BleManager, id: string, logger: Logger) {
  try {
    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `discoverAllServicesAndCharacteristicsForDevice`,
      `Device ID: ${id}`
    );
    const device = await manager.discoverAllServicesAndCharacteristicsForDevice(
      id
    );

    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `characteristicsForService`,
      `Device ID: ${id}`
    );
    const characteristics = await device.characteristicsForService(
      ARGOS_SERVICE_UUID
    );
    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `characteristicsForService_SUCCESS`,
      `Characteristics: ${JSON.stringify(characteristics.map(c => c.uuid))}`
    );

    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `monitorCharacteristicForDevice_START`,
      `Device ID: ${id}`
    );

    manager.monitorCharacteristicForDevice(
      id,
      ARGOS_SERVICE_UUID,
      'E4CC0020-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase(),
      (error, char) => {
        if (error) {
          console.log('ERROR: ', error);
        }

        if (!char) {
          return;
        }

        const buf = new ArrayBuffer(60);
        const arr = new Int16Array(buf);
        const value = Uint8Array.from(atob(char.value!), c => c.charCodeAt(0));

        const buffer = Buffer.Buffer.from(value); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
        for (let i = 0; i < 30; i += 1) {
          const sensorData = buffer.readInt16LE(i * 2);
          arr[i] = sensorData;
        }

        Object.values(onValueListeners).forEach(cb => {
          // cb(arr);
        });
      }
    );
    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `monitorCharacteristicForDevice_SUCCESS`,
      `Device ID: ${id}`
    );

    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `writeCharacteristicWithResponseForDevice_START`,
      `Device ID: ${id}`
    );
    await manager.writeCharacteristicWithResponseForDevice(
      id,
      ARGOS_SERVICE_UUID,
      'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
      btoa(String.fromCharCode(...new Uint8Array([3, 0, 0, 0])))
    );
    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      `writeCharacteristicWithResponseForDevice_SUCCESS`,
      `Device ID: ${id}`
    );
  } catch (error) {
    logger.info(LOG_GROUP_BLE_CONTAINER, `listen_error`, `Error: ${error}`);
  }
}

async function init(
  manager: BleManager,
  serviceUUID: string,
  logger: Logger,
  callbacks: Callbacks
) {
  let device: Device | null = null;
  try {
    callbacks.onScanStart();
    device = await scan(manager, serviceUUID, logger);
  } catch (error) {
    logger.info(LOG_GROUP_BLE_CONTAINER, 'init', `${error}`);
    callbacks.onScanError(`${error}`);
    return;
  }

  try {
    callbacks.onConnectStart();
    device = await connectToDevice(manager, device.id, logger);
    callbacks.onConnectSuccess(device.id);

    const deviceId = device.id;
    const subscription = manager.onDeviceDisconnected(deviceId, error => {
      if (error) {
        throw error;
      }

      // Clean up this mess
      init(manager, serviceUUID, logger, {
        ...callbacks,
        onConnectSuccess: id => {
          subscription.remove();
          callbacks.onConnectSuccess(id);
        }
      });
    });
  } catch (error) {
    callbacks.onConnectError(`Failed to connect. ${error}`);
    return;
  }

  try {
    console.log(`LISTEN START FOR DEVICE: ${device.id}`);
    await listen(manager, device.id, logger);
  } catch (error) {
    console.log('ERROR!!');
  }
}

interface Props {
  onScanStart: () => void;
  onScanError: () => void;
  onConnectStart: () => void;
  onConnectSuccess: (deviceId: string) => void;
  onConnectError: () => void;
}

function makeAppStateChangeListener(logger: Logger) {
  return function appStateChangeListener(nextState: string) {
    logger.info(
      LOG_GROUP_BLE_CONTAINER,
      LOG_GROUP_KEY_BLE_CONTAINER_APP_STATE_CHANGE,
      `Current state: ${AppState.currentState}. Next state: ${nextState}`
    );
  };
}

function BleContainer(props: Props) {
  const logger = makeLogger();

  React.useEffect(() => {
    const appStateChangeListener = makeAppStateChangeListener(logger);
    AppState.addEventListener('change', appStateChangeListener);
    return () => {
      AppState.removeEventListener('change', appStateChangeListener);
    };
  }, []);

  React.useEffect(() => {
    init(manager, ARGOS_SERVICE_UUID, logger, {
      onScanStart: props.onScanStart,
      onScanError: props.onScanError,
      onConnectStart: props.onConnectStart,
      onConnectSuccess: props.onConnectSuccess,
      onConnectError: props.onConnectError
    });

    return () => {
      console.log('DISCONNECT');
    };
  }, []);
  return <View />;
}

export default connect(undefined, dispatch => {
  return {
    onScanStart: () => {
      dispatch(scanStart());
    },
    onScanError: () => {
      dispatch(scanFailed());
    },
    onConnectStart: () => {
      dispatch(connectStart());
    },
    onConnectSuccess: (deviceId: string) => {
      dispatch(connectSuccess(deviceId));
    },
    onConnectError: () => {
      dispatch(connectFailed());
    }
  };
})(BleContainer);

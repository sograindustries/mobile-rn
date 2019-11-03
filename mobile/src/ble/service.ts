import { BleManager, Device } from 'react-native-ble-plx';
import { logEvent } from '../logging';
import Buffer from 'buffer';
import { decode as atob, encode as btoa } from 'base-64';

const ARGOS_SERVICE_UUID = 'E4CC0001-2A2A-B481-E9A1-7185D4BC7DB6';

function makeScanFn(manager: BleManager) {
  return function scan() {
    return new Promise<Device>((res, rej) => {
      logEvent('scan_start', {});
      manager.startDeviceScan(
        [ARGOS_SERVICE_UUID],
        { allowDuplicates: true } /* options */,
        (error, device) => {
          if (error) {
            logEvent('scan_error', { message: `${error}` });
            rej(error);
            return;
          }

          if (device) {
            logEvent('scan_device_found', { deviceId: device.id });
            manager.stopDeviceScan();
            res(device);
          } else {
            logEvent('scan_null_device_found', {});
          }
        }
      );
    });
  };
}

function makeConnectFn(manager: BleManager) {
  return function connect(deviceId: string) {
    return new Promise<Device>(async (res, rej) => {
      try {
        logEvent('connect_start', {});
        const device = await manager.connectToDevice(deviceId, {
          autoConnect: true
        });
        logEvent('connect_success', { deviceId: device.id });
        res(device);
      } catch (error) {
        logEvent('connect_error', { message: `${error}` });
        rej(error);
      }
    });
  };
}

function makeListenFn(manager: BleManager) {
  return async function listen(deviceId: string) {
    try {
      logEvent('discover_all_services_and_chars_start', {
        deviceId
      });
      const device = await manager.discoverAllServicesAndCharacteristicsForDevice(
        deviceId
      );
      logEvent('discover_all_services_and_chars_success', {
        deviceId
      });

      logEvent('chars_for_service_start', {
        deviceId
      });
      await device.characteristicsForService(ARGOS_SERVICE_UUID);
      logEvent('chars_for_service_success', {});

      logEvent('monitor_chars_for_device_start', {});
      const sub = manager.monitorCharacteristicForDevice(
        deviceId,
        ARGOS_SERVICE_UUID,
        'E4CC0020-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase(),
        (error, char) => {
          if (error) {
            logEvent('monitor_chars_callback_error', {
              message: `${error}`
            });
            return;
          }

          if (!char) {
            return;
          }

          const buf = new ArrayBuffer(120);
          const arr = new Int32Array(buf);
          const value = Uint8Array.from(atob(char.value!), c =>
            c.charCodeAt(0)
          );

          const buffer = Buffer.Buffer.from(value); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
          for (let i = 0; i < 30; i += 1) {
            const sensorData = buffer.readInt32LE(i * 4);
            arr[i] = sensorData;
          }

          Object.values(onValueListeners).forEach(cb => {
            cb(deviceId, arr);
          });
        }
      );

      logEvent('write_chars_start', {});
      await manager.writeCharacteristicWithResponseForDevice(
        deviceId,
        ARGOS_SERVICE_UUID,
        'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
        btoa(String.fromCharCode(...new Uint8Array([3, 0, 0, 0])))
      );
      logEvent('write_chars_success', {});
    } catch (error) {
      logEvent('ble_service_listen', { message: `${error}` });
    }
  };
}

const onValueListeners: {
  [key: string]: (deviceId: string, value: Int32Array) => void;
} = {};
function addOnValueListener(cb: (deviceId: string, value: Int32Array) => void) {
  const id = Object.keys(onValueListeners).length;
  onValueListeners[id] = cb;
  return function remove() {
    delete onValueListeners[id];
  };
}

interface Callbacks {
  scanWillStart: () => void;
  scanCompleted: () => void;
  scanFailed: (error: any) => void;

  connectWillStart: () => void;
  connectCompleted: (deviceId: string) => void;
  connectFailed: (error: any) => void;

  listenFailed: (error: any) => void;
}

interface Config {
  initialDeviceId: string;
}

export async function scanAndConnect(
  service: Service,
  callbacks: Callbacks,
  config?: Config
) {
  let deviceId = config ? config.initialDeviceId : null;

  if (!deviceId) {
    try {
      callbacks.scanWillStart();
      const device = await service.scan();
      callbacks.scanCompleted();
      deviceId = device.id;
    } catch (error) {
      callbacks.scanFailed(error);
      return;
    }
  }

  try {
    callbacks.connectWillStart();
    await service.connect(deviceId);
    callbacks.connectCompleted(deviceId);

    service.__manager.onStateChange(state => {
      console.log('STATE:', state);
    });

    const subscription = service.__manager.onDeviceDisconnected(
      deviceId,
      async error => {
        console.log('ERRROR? ', error);
        if (error) {
          logEvent('on_device_disconnected_error', { message: `${error}` });
          //   throw error;
        }

        logEvent('on_device_disconnected', {
          deviceId: deviceId || 'n/a'
        });
        if (deviceId) {
          scanAndConnect(
            service,
            {
              ...callbacks,
              connectCompleted: id => {
                callbacks.connectCompleted(id);
                subscription.remove();
              }
            },
            { initialDeviceId: deviceId }
          );
        }
      }
    );
  } catch (error) {
    callbacks.connectFailed(error);
    return;
  }

  try {
    await service.listen(deviceId);
  } catch (error) {
    callbacks.listenFailed(error);
    return;
  }
}

export function makeService(manager: BleManager) {
  manager.onStateChange(async newState => {
    logEvent('ble_service_state_change', {
      state: await manager.state(),
      newState
    });
  });

  return {
    scan: makeScanFn(manager),
    connect: makeConnectFn(manager),
    listen: makeListenFn(manager),
    addOnValueListener,
    __manager: manager
  };
}

type Service = ReturnType<typeof makeService>;

export const defaultService = makeService(
  !process.env.JEST_WORKER_ID
    ? new BleManager({
        restoreStateIdentifier: 'ble-id',
        restoreStateFunction: restoredState => {
          logEvent('ble_restore_state_fn', {
            connectedDevices: restoredState
              ? restoredState.connectedPeripherals.join(',')
              : 'n/a'
          });
        }
      })
    : ({} as any)
);
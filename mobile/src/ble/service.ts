import { BleManager, Device } from 'react-native-ble-plx';
import { logEvent } from '../logging';
import Buffer from 'buffer';
import { decode as atob, encode as btoa } from 'base-64';

const ARGOS_SERVICE_UUID = 'E4CC0001-2A2A-B481-E9A1-7185D4BC7DB6';

export type Mode = 'ramp' | 'real_ADC' | 'arrhythmia' | 'constant';

const clearMode = (cmd: any) => cmd & ~(1 << 1) & ~(1 << 2);
const modeRamp = (cmd: any) => clearMode(cmd);
const modeRealADC = (cmd: any) => clearMode(cmd) | (1 << 1);
const modeArrhythmia = (cmd: any) => clearMode(cmd) | (1 << 2);
const modeConstant = (cmd: any) => clearMode(cmd) | (1 << 1) | (1 << 2);

const light0 = 1 << 3;
const light1 = 1 << 4;
const light2 = 1 << 5;
const filterDisabled = 1 << 1;

const lightOn = (cmd: any, light: any) => cmd | light;
const lightOff = (cmd: any, light: any) => cmd & ~light;

const disableFiltering = (cmd: any) => cmd | filterDisabled;
const enableFiltering = (cmd: any) => cmd & ~filterDisabled;

let command = modeRealADC(1);

let prefix = '';
export function setPrefix(value: string) {
  prefix = value;
}

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

function makeGetFWCommitHash(manager: BleManager) {
  return function getFWCommitHash(deviceId: string) {
    return new Promise<string | null>(async (res, rej) => {
      const device = await manager.discoverAllServicesAndCharacteristicsForDevice(
        deviceId
      );

      try {
        const fwCommitHash = await device.readCharacteristicForService(
          ARGOS_SERVICE_UUID,
          'E4CC0004-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase()
        );

        console.log('HASHHHH: ', atob(fwCommitHash.value || ''));

        res(fwCommitHash.value ? atob(fwCommitHash.value) : null);
      } catch (error) {
        console.warn(error);
        res(null);
      }
    });
  };
}

function makeGetUptime(manager: BleManager) {
  return function getFWCommitHash(deviceId: string) {
    return new Promise<number | null>(async (res, rej) => {
      const device = await manager.discoverAllServicesAndCharacteristicsForDevice(
        deviceId
      );

      try {
        const char = await device.readCharacteristicForService(
          ARGOS_SERVICE_UUID,
          'E4CC0002-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase()
        );

        const value = Int32Array.from(atob(char.value!), c => c.charCodeAt(0));
        const buffer = Buffer.Buffer.from(value);
        res(buffer.readInt32LE(0));
      } catch (error) {
        console.warn(error);
        res(null);
      }
    });
  };
}

function makeSetLEDFn(manager: BleManager) {
  return async function setLED(
    deviceId: string,
    lightNumber: number,
    isEnabled: boolean
  ) {
    const toggle = (light: any) =>
      isEnabled ? lightOn(command, light) : lightOff(command, light);

    switch (lightNumber) {
      case 0:
        command = toggle(light0);
        break;
      case 1:
        command = toggle(light1);
        break;
      case 2:
        command = toggle(light2);
        break;
    }

    await manager.writeCharacteristicWithResponseForDevice(
      deviceId,
      ARGOS_SERVICE_UUID,
      'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
      btoa(String.fromCharCode(...new Uint8Array([command, 0, 0, 0])))
    );
  };
}

function makeEnterDFUFn(manager: BleManager) {
  return async function setLED(deviceId: string) {
    await manager.writeCharacteristicWithResponseForDevice(
      deviceId,
      ARGOS_SERVICE_UUID,
      'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
      btoa(String.fromCharCode(...new Uint8Array([command, 1, 0, 0])))
    );
  };
}

function makeSetModeFn(manager: BleManager) {
  return async function setLED(deviceId: string, mode: Mode) {
    switch (mode) {
      case 'ramp':
        command = modeRamp(command);
        break;
      case 'real_ADC':
        command = modeRealADC(command);
        break;
      case 'arrhythmia':
        command = modeArrhythmia(command);
        break;
      case 'constant':
        command = modeConstant(command);
        break;
    }

    await manager.writeCharacteristicWithResponseForDevice(
      deviceId,
      ARGOS_SERVICE_UUID,
      'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
      btoa(String.fromCharCode(...new Uint8Array([command, 0, 0, 0])))
    );
  };
}

function makeSetFiltering(manager: BleManager) {
  return async function setLED(deviceId: string, isEnabled: boolean) {
    const filterBit = isEnabled ? enableFiltering(0) : disableFiltering(0);

    await manager.writeCharacteristicWithResponseForDevice(
      deviceId,
      ARGOS_SERVICE_UUID,
      'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
      btoa(String.fromCharCode(...new Uint8Array([command, filterBit, 0, 0])))
    );
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
      manager.monitorCharacteristicForDevice(
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

          const value = Uint8Array.from(atob(char.value!), c =>
            c.charCodeAt(0)
          );

          const buffer = Buffer.Buffer.from(value);

          const packetCount = buffer.readInt32LE(0);
          const status = buffer.readUInt8(4);

          const arr = new Int32Array(new ArrayBuffer(120));
          for (let i = 0; i < (buffer.length - 5) / 4; i += 1) {
            const sensorData = buffer.readInt32LE(5 + i * 4);
            arr[i] = sensorData;
          }

          Object.values(onValueListeners).forEach(cb => {
            if (fob.shouldSimulateFob) {
              if (fob.leftFingerActive && fob.rightFingerActive) {
                cb(deviceId, { packetCount, status, payload: arr, prefix });
              }
            } else {
              cb(deviceId, { packetCount, status, payload: arr, prefix });
            }
          });
        }
      );

      command = 1;
      command = modeRealADC(command);

      logEvent('write_chars_start', {});
      await manager.writeCharacteristicWithResponseForDevice(
        deviceId,
        ARGOS_SERVICE_UUID,
        'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(),
        btoa(String.fromCharCode(...new Uint8Array([command, 0, 0, 0])))
      );
      logEvent('write_chars_success', {});
    } catch (error) {
      logEvent('ble_service_listen', { message: `${error}` });
    }
  };
}

const fob = {
  shouldSimulateFob: false,
  leftFingerActive: false,
  rightFingerActive: false
};
export function setShouldSimulateFob(value: boolean) {
  fob.shouldSimulateFob = value;
}

export function setLeftFingerState(value: boolean) {
  fob.leftFingerActive = value;
}

export function setRightFingerState(value: boolean) {
  fob.rightFingerActive = value;
}

export interface EcgMessage {
  packetCount: number;
  status: number;
  payload: Int32Array;
  prefix?: string;
}

let listenerIndex = 0;
const onValueListeners: {
  [key: string]: (deviceId: string, message: EcgMessage) => void;
} = {};
function addOnValueListener(
  cb: (deviceId: string, message: EcgMessage) => void
) {
  // TODO: make unique.
  const id = listenerIndex;
  listenerIndex += 1;
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
  connectCompleted: (deviceId: {
    deviceId: string;
    firmwareVersion: string;
  }) => void;
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
    let device = await service.connect(deviceId);
    device = await device.discoverAllServicesAndCharacteristics();

    const fwCommitHash = await device.readCharacteristicForService(
      ARGOS_SERVICE_UUID,
      'E4CC0004-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase()
    );
    const firmwareVersion = fwCommitHash.value
      ? atob(fwCommitHash.value)
      : null;

    callbacks.connectCompleted({
      deviceId: device.id,
      firmwareVersion: firmwareVersion || 'n/a'
    });

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
    getFWCommitHash: makeGetFWCommitHash(manager),
    getUptime: makeGetUptime(manager),
    setLED: makeSetLEDFn(manager),
    setFiltering: makeSetFiltering(manager),
    setMode: makeSetModeFn(manager),
    enterDFU: makeEnterDFUFn(manager),
    addOnValueListener,
    __manager: manager
  };
}

type Service = ReturnType<typeof makeService>;

export const defaultBleManager = new BleManager({
  restoreStateIdentifier: 'ble-id',
  restoreStateFunction: restoredState => {
    logEvent('ble_restore_state_fn', {
      connectedDevices: restoredState
        ? restoredState.connectedPeripherals.join(',')
        : 'n/a'
    });
  }
});

export const defaultService = makeService(
  !process.env.JEST_WORKER_ID ? defaultBleManager : ({} as any)
);

export type BleService = ReturnType<typeof makeService>;

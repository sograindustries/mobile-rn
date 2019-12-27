import { action } from 'typesafe-actions';
import { Mode } from '../../ble/service';

export function scanStart() {
  return action('ACTION_SCAN_START');
}

function scanSuccess(peripherals: { id: string }[]) {
  return action('ACTION_SCAN_SUCCESS', { peripherals });
}

export function scanFailed() {
  return action('ACTION_SCAN_FAILURE');
}

export function connectStart() {
  return action('ACTION_CONNECT_START');
}

export function connectSuccess(deviceId: string, firmwareVersion: string) {
  return action('ACTION_CONNECT_SUCCESS', { deviceId, firmwareVersion });
}

export function connectFailed() {
  return action('ACTION_CONNECT_FAILURE');
}

export function disconnect() {
  return action('ACTION_DISCONNECT');
}

function setEcg(value: number) {
  return action('ACTION_SET_ECG', value);
}

export function setLed(id: number, isEnabled: boolean) {
  return action('ACTION_SET_LED', { id, isEnabled });
}

export function setFiltering(isEnabled: boolean) {
  return action('ACTION_SET_FILTERING', isEnabled);
}

export function setMode(mode: Mode) {
  return action('ACTION_SET_HEART_MODE', mode);
}

export function setReadingPrefix(prefix: string) {
  return action('ACTION_SET_READING_PREFIX', prefix);
}

export type BleAction = ReturnType<
  | typeof scanStart
  | typeof scanSuccess
  | typeof scanFailed
  | typeof connectStart
  | typeof connectSuccess
  | typeof connectFailed
  | typeof disconnect
  | typeof setEcg
  | typeof setLed
  | typeof setFiltering
  | typeof setMode
  | typeof setReadingPrefix
>;

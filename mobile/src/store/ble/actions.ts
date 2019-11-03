import { action } from 'typesafe-actions';

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

export function connectSuccess(deviceId: string) {
  return action('ACTION_CONNECT_SUCCESS', deviceId);
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

export type BleAction = ReturnType<
  | typeof scanStart
  | typeof scanSuccess
  | typeof scanFailed
  | typeof connectStart
  | typeof connectSuccess
  | typeof connectFailed
  | typeof disconnect
  | typeof setEcg
>;

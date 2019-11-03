import { combineReducers } from 'redux';
import { BleAction } from './actions';
import { BleStatus } from './types';

function peripherals(state: { id: string }[] = [], action: BleAction) {
  switch (action.type) {
    case 'ACTION_SCAN_FAILURE':
    case 'ACTION_SCAN_START':
    case 'ACTION_DISCONNECT':
      return [];
    case 'ACTION_SCAN_SUCCESS':
      return [...action.payload.peripherals];
    default:
      return state;
  }
}

function ecg(state: number | null = null, action: BleAction) {
  switch (action.type) {
    case 'ACTION_SET_ECG':
      return action.payload;
    case 'ACTION_CONNECT_FAILURE':
    case 'ACTION_DISCONNECT':
      return null;
    default:
      return state;
  }
}

function ecgSet(state: number[] = [], action: BleAction) {
  switch (action.type) {
    case 'ACTION_SET_ECG':
      const arr = [...state, action.payload].splice(
        Math.min(state.length - 1200, 0),
        1200
      );

      //   console.log(arr.length);
      return arr;
    case 'ACTION_CONNECT_FAILURE':
    case 'ACTION_DISCONNECT':
      return [];
    default:
      return state;
  }
}

function status(
  state: BleStatus = 'disconnected',
  action: BleAction
): BleStatus {
  switch (action.type) {
    case 'ACTION_SCAN_START':
      return 'scanning';
    case 'ACTION_SCAN_FAILURE':
      return 'error';
    case 'ACTION_SCAN_SUCCESS':
      if (action.payload.peripherals.length > 0) {
        return 'pending';
      } else {
        return 'no_peripherals';
      }
    case 'ACTION_CONNECT_START':
      return 'connecting';
    case 'ACTION_CONNECT_SUCCESS':
      return 'connected';
    case 'ACTION_CONNECT_FAILURE':
      return 'error';
    case 'ACTION_DISCONNECT':
      return 'disconnected';
    default:
      return state;
  }
}

export const reducer = combineReducers({
  status,
  peripherals,
  ecg,
  ecgSet
});
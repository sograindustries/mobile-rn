import AsyncStorage from '@react-native-community/async-storage';

const ASYNC_STORAGE_KEY_ECG = 'ASYNC_STORAGE_KEY_ECG';

function makeAddFn() {
  return async function add(payload: number[]) {
    const item = JSON.stringify({ [new Date().getTime() / 1000]: payload });
    await AsyncStorage.mergeItem(ASYNC_STORAGE_KEY_ECG, item);

    //  logEvent('sample_payload_add', {}, true /* localOnly */);
  };
}

function makeGetPayloadsFn() {
  return async function getPayloads() {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_ECG);
    await AsyncStorage.removeItem(ASYNC_STORAGE_KEY_ECG);
    return JSON.parse(value || '{}');
  };
}

export function makeStorage() {
  return {
    add: makeAddFn(),
    getPayloads: makeGetPayloadsFn()
  };
}

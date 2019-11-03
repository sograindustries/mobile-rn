import AsyncStorage from '@react-native-community/async-storage';
import { AppState } from '../../store';

const LOCAL_STORAGE_KEY_STATE = 'state';

function getState() {
  return AsyncStorage.getItem(LOCAL_STORAGE_KEY_STATE);
}

function setState(state: AppState | null) {
  if (!state) {
    return AsyncStorage.removeItem(LOCAL_STORAGE_KEY_STATE);
  }

  return AsyncStorage.setItem(LOCAL_STORAGE_KEY_STATE, JSON.stringify(state));
}

export default {
  getState,
  setState
};

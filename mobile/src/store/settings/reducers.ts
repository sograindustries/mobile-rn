import { combineReducers } from 'redux';
import { SettingsAction } from './actions';

function developerMode(
  state: boolean = false,
  action: SettingsAction
): boolean {
  switch (action.type) {
    case 'ACTION_SET_DEVELOPER_MODE':
      return action.payload;
    default:
      return state;
  }
}

function simulateFob(state: boolean = false, action: SettingsAction): boolean {
  switch (action.type) {
    case 'ACTION_SET_SIMULATE_FOB':
      return action.payload;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  developerMode,
  simulateFob
});

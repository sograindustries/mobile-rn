import { combineReducers } from 'redux';
import { SettingsAction } from './actions';

function developerMode(state: boolean = true, action: SettingsAction): boolean {
  switch (action.type) {
    case 'ACTION_SET_DEVELOPER_MODE':
      return action.payload;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  developerMode
});

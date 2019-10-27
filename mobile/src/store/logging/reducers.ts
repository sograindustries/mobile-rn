import { combineReducers } from 'redux';
import { LogItem } from './types';
import { LoggingAction } from './actions';

function samplePayloadCount(state: number = 0, action: LoggingAction) {
  switch (action.type) {
    case 'ACTION_SET_SAMPLE_PAYLOAD_COUNT':
      return action.payload;
    default:
      return state;
  }
}

function logs(state: LogItem[] = [], action: LoggingAction): LogItem[] {
  switch (action.type) {
    case 'ACTION_ADD_LOG_ITEM':
      return [action.payload, ...state];
    case 'ACTION_CLEAR_LOGS':
      return [];
    default:
      return state;
  }
}

export const reducer = combineReducers({
  logs,
  samplePayloadCount
});

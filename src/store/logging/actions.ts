import { LogItem } from './types';
import { action } from 'typesafe-actions';

export function addLogItem(item: LogItem) {
  return action('ACTION_ADD_LOG_ITEM', item);
}

export function clearLogs() {
  return action('ACTION_CLEAR_LOGS');
}

export function setSamplePayloadCount(value: number) {
  return action('ACTION_SET_SAMPLE_PAYLOAD_COUNT', value);
}

export type LoggingAction = ReturnType<
  typeof addLogItem | typeof clearLogs | typeof setSamplePayloadCount
>;

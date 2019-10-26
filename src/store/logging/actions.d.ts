import { LogItem } from './types';
export declare function addLogItem(item: LogItem): {
    type: "ACTION_ADD_LOG_ITEM";
    payload: LogItem;
};
export declare function clearLogs(): {
    type: "ACTION_CLEAR_LOGS";
};
export declare function setSamplePayloadCount(value: number): {
    type: "ACTION_SET_SAMPLE_PAYLOAD_COUNT";
    payload: number;
};
export declare type LoggingAction = ReturnType<typeof addLogItem | typeof clearLogs | typeof setSamplePayloadCount>;

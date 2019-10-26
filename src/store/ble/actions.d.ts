export declare function scanStart(): {
    type: "ACTION_SCAN_START";
};
declare function scanSuccess(peripherals: {
    id: string;
}[]): {
    type: "ACTION_SCAN_SUCCESS";
    payload: {
        peripherals: {
            id: string;
        }[];
    };
};
export declare function scanFailed(): {
    type: "ACTION_SCAN_FAILURE";
};
export declare function connectStart(): {
    type: "ACTION_CONNECT_START";
};
export declare function connectSuccess(deviceId: string): {
    type: "ACTION_CONNECT_SUCCESS";
    payload: string;
};
export declare function connectFailed(): {
    type: "ACTION_CONNECT_FAILURE";
};
export declare function disconnect(): {
    type: "ACTION_DISCONNECT";
};
declare function setEcg(value: number): {
    type: "ACTION_SET_ECG";
    payload: number;
};
export declare type BleAction = ReturnType<typeof scanStart | typeof scanSuccess | typeof scanFailed | typeof connectStart | typeof connectSuccess | typeof connectFailed | typeof disconnect | typeof setEcg>;
export {};

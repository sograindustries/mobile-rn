import { BleManager, Device } from 'react-native-ble-plx';
declare function addOnValueListener(cb: (value: Int16Array) => void): () => void;
interface Callbacks {
    scanWillStart: () => void;
    scanCompleted: () => void;
    scanFailed: (error: any) => void;
    connectWillStart: () => void;
    connectCompleted: (deviceId: string) => void;
    connectFailed: (error: any) => void;
    listenFailed: (error: any) => void;
}
interface Config {
    initialDeviceId: string;
}
export declare function scanAndConnect(service: Service, callbacks: Callbacks, config?: Config): Promise<void>;
export declare function makeService(manager: BleManager): {
    scan: () => Promise<Device>;
    connect: (deviceId: string) => Promise<Device>;
    listen: (deviceId: string) => Promise<void>;
    addOnValueListener: typeof addOnValueListener;
    __manager: BleManager;
};
declare type Service = ReturnType<typeof makeService>;
export declare const defaultService: {
    scan: () => Promise<Device>;
    connect: (deviceId: string) => Promise<Device>;
    listen: (deviceId: string) => Promise<void>;
    addOnValueListener: typeof addOnValueListener;
    __manager: BleManager;
};
export {};

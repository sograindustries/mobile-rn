export declare function makeStorage(): {
    add: (payload: number[]) => Promise<void>;
    getPayloads: () => Promise<any>;
};

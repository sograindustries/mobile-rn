"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_1 = require("@react-native-community/async-storage");
var LOCAL_STORAGE_KEY_STATE = 'state';
function getState() {
    return async_storage_1.default.getItem(LOCAL_STORAGE_KEY_STATE);
}
function setState(state) {
    return async_storage_1.default.setItem(LOCAL_STORAGE_KEY_STATE, JSON.stringify(state));
}
exports.default = {
    getState: getState,
    setState: setState
};

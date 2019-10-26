"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_actions_1 = require("typesafe-actions");
function scanStart() {
    return typesafe_actions_1.action('ACTION_SCAN_START');
}
exports.scanStart = scanStart;
function scanSuccess(peripherals) {
    return typesafe_actions_1.action('ACTION_SCAN_SUCCESS', { peripherals: peripherals });
}
function scanFailed() {
    return typesafe_actions_1.action('ACTION_SCAN_FAILURE');
}
exports.scanFailed = scanFailed;
function connectStart() {
    return typesafe_actions_1.action('ACTION_CONNECT_START');
}
exports.connectStart = connectStart;
function connectSuccess(deviceId) {
    return typesafe_actions_1.action('ACTION_CONNECT_SUCCESS', deviceId);
}
exports.connectSuccess = connectSuccess;
function connectFailed() {
    return typesafe_actions_1.action('ACTION_CONNECT_FAILURE');
}
exports.connectFailed = connectFailed;
function disconnect() {
    return typesafe_actions_1.action('ACTION_DISCONNECT');
}
exports.disconnect = disconnect;
function setEcg(value) {
    return typesafe_actions_1.action('ACTION_SET_ECG', value);
}

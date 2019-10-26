"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
function peripherals(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'ACTION_SCAN_FAILURE':
        case 'ACTION_SCAN_START':
        case 'ACTION_DISCONNECT':
            return [];
        case 'ACTION_SCAN_SUCCESS':
            return __spreadArrays(action.payload.peripherals);
        default:
            return state;
    }
}
function ecg(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case 'ACTION_SET_ECG':
            return action.payload;
        case 'ACTION_CONNECT_FAILURE':
        case 'ACTION_DISCONNECT':
            return null;
        default:
            return state;
    }
}
function ecgSet(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'ACTION_SET_ECG':
            var arr = __spreadArrays(state, [action.payload]).splice(Math.min(state.length - 1200, 0), 1200);
            //   console.log(arr.length);
            return arr;
        case 'ACTION_CONNECT_FAILURE':
        case 'ACTION_DISCONNECT':
            return [];
        default:
            return state;
    }
}
function status(state, action) {
    if (state === void 0) { state = 'disconnected'; }
    switch (action.type) {
        case 'ACTION_SCAN_START':
            return 'scanning';
        case 'ACTION_SCAN_FAILURE':
            return 'error';
        case 'ACTION_SCAN_SUCCESS':
            if (action.payload.peripherals.length > 0) {
                return 'pending';
            }
            else {
                return 'no_peripherals';
            }
        case 'ACTION_CONNECT_START':
            return 'connecting';
        case 'ACTION_CONNECT_SUCCESS':
            return 'connected';
        case 'ACTION_CONNECT_FAILURE':
            return 'error';
        case 'ACTION_DISCONNECT':
            return 'disconnected';
        default:
            return state;
    }
}
exports.reducer = redux_1.combineReducers({
    status: status,
    peripherals: peripherals,
    ecg: ecg,
    ecgSet: ecgSet
});

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
function samplePayloadCount(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'ACTION_SET_SAMPLE_PAYLOAD_COUNT':
            return action.payload;
        default:
            return state;
    }
}
function logs(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'ACTION_ADD_LOG_ITEM':
            return __spreadArrays([action.payload], state);
        case 'ACTION_CLEAR_LOGS':
            return [];
        default:
            return state;
    }
}
exports.reducer = redux_1.combineReducers({
    logs: logs,
    samplePayloadCount: samplePayloadCount
});

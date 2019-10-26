"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_actions_1 = require("typesafe-actions");
function addLogItem(item) {
    return typesafe_actions_1.action('ACTION_ADD_LOG_ITEM', item);
}
exports.addLogItem = addLogItem;
function clearLogs() {
    return typesafe_actions_1.action('ACTION_CLEAR_LOGS');
}
exports.clearLogs = clearLogs;
function setSamplePayloadCount(value) {
    return typesafe_actions_1.action('ACTION_SET_SAMPLE_PAYLOAD_COUNT', value);
}
exports.setSamplePayloadCount = setSamplePayloadCount;

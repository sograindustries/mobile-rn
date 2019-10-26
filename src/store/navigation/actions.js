"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateTab(tab) {
    return {
        type: 'ACTION_UPDATE_TAB',
        payload: tab,
    };
}
exports.updateTab = updateTab;

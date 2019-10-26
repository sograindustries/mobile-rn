"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
function isFirstSession(state, action) {
    if (state === void 0) { state = true; }
    switch (action.type) {
        case 'ACTION_UPDATE_IS_FIRST_SESSION':
            return action.payload;
        default:
            return state;
    }
}
function user(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case 'ACTION_LOGIN_SUCCESS':
            return action.payload;
        case 'ACTION_LOGIN_FAILED':
            return null;
        case 'ACTION_LOGOUT_SUCCESS':
            return null;
        default:
            return state;
    }
}
exports.reducer = redux_1.combineReducers({
    user: user,
    isFirstSession: isFirstSession
});

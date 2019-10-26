"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function reducer(state, action) {
    if (state === void 0) { state = 'home'; }
    switch (action.type) {
        case types_1.ACTION_UPDATE_TAB:
            return action.payload;
        default:
            return state;
    }
}
exports.reducer = reducer;

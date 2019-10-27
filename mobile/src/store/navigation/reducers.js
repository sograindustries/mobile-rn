"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function reducer(state = 'home', action) {
    switch (action.type) {
        case types_1.ACTION_UPDATE_TAB:
            return action.payload;
        default:
            return state;
    }
}
exports.reducer = reducer;
//# sourceMappingURL=reducers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducers_1 = require("./ble/reducers");
var reducers_2 = require("./navigation/reducers");
var reducers_3 = require("./session/reducers");
var reducers_4 = require("./logging/reducers");
exports.rootReducer = redux_1.combineReducers({
    ble: reducers_1.reducer,
    navigation: reducers_2.reducer,
    session: reducers_3.reducer,
    logging: reducers_4.reducer
});

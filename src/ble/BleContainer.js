"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var service_1 = require("../ble/service");
var react_redux_1 = require("react-redux");
var logging_1 = require("../logging");
var actions_1 = require("../store/ble/actions");
var LOG_KEY_BLE_CNOTAINER = 'ble_container';
function BleContainer(props) {
    React.useEffect(function () {
        props.onMount();
    }, []);
    return <native_base_1.View />;
}
exports.default = react_redux_1.connect(undefined, function (dispatch) {
    var onMount = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            service_1.scanAndConnect(service_1.defaultService, {
                scanWillStart: function () {
                    dispatch(actions_1.scanStart());
                },
                scanCompleted: function () {
                    logging_1.logEvent(LOG_KEY_BLE_CNOTAINER, { message: 'scan completed.' });
                },
                scanFailed: function (error) {
                    dispatch(actions_1.scanFailed());
                    logging_1.logEvent(LOG_KEY_BLE_CNOTAINER, { message: "" + error });
                },
                connectWillStart: function () {
                    dispatch(actions_1.connectStart());
                },
                connectCompleted: function (deviceId) {
                    dispatch(actions_1.connectSuccess(deviceId));
                },
                connectFailed: function (error) {
                    dispatch(actions_1.connectFailed());
                    logging_1.logEvent(LOG_KEY_BLE_CNOTAINER, { message: "" + error });
                },
                listenFailed: function () { }
            });
            return [2 /*return*/];
        });
    }); };
    return {
        onMount: onMount
    };
})(BleContainer);

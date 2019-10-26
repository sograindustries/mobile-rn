"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_native_ble_plx_1 = require("react-native-ble-plx");
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/ble/actions");
var react_native_1 = require("react-native");
var buffer_1 = require("buffer");
var base_64_1 = require("base-64");
var analytics_1 = require("@react-native-firebase/analytics");
var ARGOS_SERVICE_UUID = 'E4CC0001-2A2A-B481-E9A1-7185D4BC7DB6';
var LOG_GROUP_BLE_CONTAINER = 'ble-container';
var LOG_GROUP_KEY_BLE_CONTAINER_APP_STATE_CHANGE = 'app-state-change';
function makeLogger() {
    return {
        info: function (group, key, message) {
            console.log(group + " " + key + ": " + (message || 'no message.'));
            analytics_1.firebase.analytics().logEvent("some_event", {
                message: message || 'n/'
            });
        }
    };
}
var manager = new react_native_ble_plx_1.BleManager();
function scan(manager, serviceUUID, logger) {
    return new Promise(function (res, rej) {
        logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_begin');
        manager.startDeviceScan([serviceUUID], {}, function (error, device) {
            if (error) {
                logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_error', "Code: " + error.errorCode + ". Reason: " + error.reason);
                rej(error);
                return;
            }
            if (!device) {
                logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_device_null', 'Device is null. Continue scanning...');
            }
            if (device) {
                logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_device_found', "Device ID: " + device.id);
                manager.stopDeviceScan();
                logger.info(LOG_GROUP_BLE_CONTAINER, 'scan_stopped');
                res(device);
                return;
            }
        });
    });
}
function connectToDevice(manager, id, logger) {
    var _this = this;
    return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
        var device, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    logger.info(LOG_GROUP_BLE_CONTAINER, 'connect_start', "Connecting to device " + id);
                    return [4 /*yield*/, manager.connectToDevice(id, { timeout: 3000 })];
                case 1:
                    device = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, 'connect_success', "Connected to device " + device.id);
                    res(device);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, 'connect_error', "Failed to connect to device " + id + ". Error: " + error_1);
                    rej(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
var onValueListeners = {};
function addOnValueListener(cb) {
    var id = Object.keys(onValueListeners).length;
    onValueListeners[id] = cb;
    return function remove() {
        delete onValueListeners[id];
    };
}
exports.addOnValueListener = addOnValueListener;
function listen(manager, id, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var device, characteristics, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    logger.info(LOG_GROUP_BLE_CONTAINER, "discoverAllServicesAndCharacteristicsForDevice", "Device ID: " + id);
                    return [4 /*yield*/, manager.discoverAllServicesAndCharacteristicsForDevice(id)];
                case 1:
                    device = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, "characteristicsForService", "Device ID: " + id);
                    return [4 /*yield*/, device.characteristicsForService(ARGOS_SERVICE_UUID)];
                case 2:
                    characteristics = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, "characteristicsForService_SUCCESS", "Characteristics: " + JSON.stringify(characteristics.map(function (c) { return c.uuid; })));
                    logger.info(LOG_GROUP_BLE_CONTAINER, "monitorCharacteristicForDevice_START", "Device ID: " + id);
                    manager.monitorCharacteristicForDevice(id, ARGOS_SERVICE_UUID, 'E4CC0020-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase(), function (error, char) {
                        if (error) {
                            console.log('ERROR: ', error);
                        }
                        if (!char) {
                            return;
                        }
                        var buf = new ArrayBuffer(60);
                        var arr = new Int16Array(buf);
                        var value = Uint8Array.from(base_64_1.decode(char.value), function (c) { return c.charCodeAt(0); });
                        var buffer = buffer_1.default.Buffer.from(value); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                        for (var i = 0; i < 30; i += 1) {
                            var sensorData = buffer.readInt16LE(i * 2);
                            arr[i] = sensorData;
                        }
                        Object.values(onValueListeners).forEach(function (cb) {
                            cb(arr);
                        });
                    });
                    logger.info(LOG_GROUP_BLE_CONTAINER, "monitorCharacteristicForDevice_SUCCESS", "Device ID: " + id);
                    logger.info(LOG_GROUP_BLE_CONTAINER, "writeCharacteristicWithResponseForDevice_START", "Device ID: " + id);
                    return [4 /*yield*/, manager.writeCharacteristicWithResponseForDevice(id, ARGOS_SERVICE_UUID, 'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(), base_64_1.encode(String.fromCharCode.apply(String, new Uint8Array([3, 0, 0, 0]))))];
                case 3:
                    _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, "writeCharacteristicWithResponseForDevice_SUCCESS", "Device ID: " + id);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, "listen_error", "Error: " + error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function init(manager, serviceUUID, logger, callbacks) {
    return __awaiter(this, void 0, void 0, function () {
        var device, error_3, deviceId, subscription_1, error_4, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    device = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    callbacks.onScanStart();
                    return [4 /*yield*/, scan(manager, serviceUUID, logger)];
                case 2:
                    device = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    logger.info(LOG_GROUP_BLE_CONTAINER, 'init', "" + error_3);
                    callbacks.onScanError("" + error_3);
                    return [2 /*return*/];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    callbacks.onConnectStart();
                    return [4 /*yield*/, connectToDevice(manager, device.id, logger)];
                case 5:
                    device = _a.sent();
                    callbacks.onConnectSuccess(device.id);
                    deviceId = device.id;
                    subscription_1 = manager.onDeviceDisconnected(deviceId, function (error) {
                        if (error) {
                            throw error;
                        }
                        // Clean up this mess
                        init(manager, serviceUUID, logger, __assign(__assign({}, callbacks), { onConnectSuccess: function (id) {
                                subscription_1.remove();
                                callbacks.onConnectSuccess(id);
                            } }));
                    });
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    callbacks.onConnectError("Failed to connect. " + error_4);
                    return [2 /*return*/];
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    console.log("LISTEN START FOR DEVICE: " + device.id);
                    return [4 /*yield*/, listen(manager, device.id, logger)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_5 = _a.sent();
                    console.log('ERROR!!');
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function makeAppStateChangeListener(logger) {
    return function appStateChangeListener(nextState) {
        logger.info(LOG_GROUP_BLE_CONTAINER, LOG_GROUP_KEY_BLE_CONTAINER_APP_STATE_CHANGE, "Current state: " + react_native_1.AppState.currentState + ". Next state: " + nextState);
    };
}
function BleContainer(props) {
    var logger = makeLogger();
    React.useEffect(function () {
        var appStateChangeListener = makeAppStateChangeListener(logger);
        react_native_1.AppState.addEventListener('change', appStateChangeListener);
        return function () {
            react_native_1.AppState.removeEventListener('change', appStateChangeListener);
        };
    }, []);
    React.useEffect(function () {
        init(manager, ARGOS_SERVICE_UUID, logger, {
            onScanStart: props.onScanStart,
            onScanError: props.onScanError,
            onConnectStart: props.onConnectStart,
            onConnectSuccess: props.onConnectSuccess,
            onConnectError: props.onConnectError
        });
        return function () {
            console.log('DISCONNECT');
        };
    }, []);
    return <native_base_1.View />;
}
exports.default = react_redux_1.connect(undefined, function (dispatch) {
    return {
        onScanStart: function () {
            dispatch(actions_1.scanStart());
        },
        onScanError: function () {
            dispatch(actions_1.scanFailed());
        },
        onConnectStart: function () {
            dispatch(actions_1.connectStart());
        },
        onConnectSuccess: function (deviceId) {
            dispatch(actions_1.connectSuccess(deviceId));
        },
        onConnectError: function () {
            dispatch(actions_1.connectFailed());
        }
    };
})(BleContainer);

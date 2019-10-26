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
var react_native_ble_plx_1 = require("react-native-ble-plx");
var logging_1 = require("../logging");
var buffer_1 = require("buffer");
var base_64_1 = require("base-64");
var ARGOS_SERVICE_UUID = 'E4CC0001-2A2A-B481-E9A1-7185D4BC7DB6';
function makeScanFn(manager) {
    return function scan() {
        return new Promise(function (res, rej) {
            logging_1.logEvent('scan_start', {});
            manager.startDeviceScan([ARGOS_SERVICE_UUID], { allowDuplicates: true } /* options */, function (error, device) {
                if (error) {
                    logging_1.logEvent('scan_error', { message: "" + error });
                    rej(error);
                    return;
                }
                if (device) {
                    logging_1.logEvent('scan_device_found', { deviceId: device.id });
                    manager.stopDeviceScan();
                    res(device);
                }
                else {
                    logging_1.logEvent('scan_null_device_found', {});
                }
            });
        });
    };
}
function makeConnectFn(manager) {
    return function connect(deviceId) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var device, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logging_1.logEvent('connect_start', {});
                        return [4 /*yield*/, manager.connectToDevice(deviceId, {
                                autoConnect: true
                            })];
                    case 1:
                        device = _a.sent();
                        logging_1.logEvent('connect_success', { deviceId: device.id });
                        res(device);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        logging_1.logEvent('connect_error', { message: "" + error_1 });
                        rej(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
}
function makeListenFn(manager) {
    return function listen(deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var device, sub, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        logging_1.logEvent('discover_all_services_and_chars_start', {
                            deviceId: deviceId
                        });
                        return [4 /*yield*/, manager.discoverAllServicesAndCharacteristicsForDevice(deviceId)];
                    case 1:
                        device = _a.sent();
                        logging_1.logEvent('discover_all_services_and_chars_success', {
                            deviceId: deviceId
                        });
                        logging_1.logEvent('chars_for_service_start', {
                            deviceId: deviceId
                        });
                        return [4 /*yield*/, device.characteristicsForService(ARGOS_SERVICE_UUID)];
                    case 2:
                        _a.sent();
                        logging_1.logEvent('chars_for_service_success', {});
                        logging_1.logEvent('monitor_chars_for_device_start', {});
                        sub = manager.monitorCharacteristicForDevice(deviceId, ARGOS_SERVICE_UUID, 'E4CC0020-2A2A-B481-E9A1-7185D4BC7DB6'.toLocaleLowerCase(), function (error, char) {
                            if (error) {
                                logging_1.logEvent('monitor_chars_callback_error', {
                                    message: "" + error
                                });
                                return;
                            }
                            if (!char) {
                                return;
                            }
                            var buf = new ArrayBuffer(60);
                            var arr = new Int16Array(buf);
                            var value = Uint8Array.from(base_64_1.decode(char.value), function (c) {
                                return c.charCodeAt(0);
                            });
                            var buffer = buffer_1.default.Buffer.from(value); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                            for (var i = 0; i < 30; i += 1) {
                                var sensorData = buffer.readInt16LE(i * 2);
                                arr[i] = sensorData;
                            }
                            Object.values(onValueListeners).forEach(function (cb) {
                                cb(arr);
                            });
                        });
                        logging_1.logEvent('write_chars_start', {});
                        return [4 /*yield*/, manager.writeCharacteristicWithResponseForDevice(deviceId, ARGOS_SERVICE_UUID, 'E4CC0003-2A2A-B481-E9A1-7185D4BC7DB6'.toLowerCase(), base_64_1.encode(String.fromCharCode.apply(String, new Uint8Array([3, 0, 0, 0]))))];
                    case 3:
                        _a.sent();
                        logging_1.logEvent('write_chars_success', {});
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        logging_1.logEvent('ble_service_listen', { message: "" + error_2 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
}
var onValueListeners = {};
function addOnValueListener(cb) {
    var id = Object.keys(onValueListeners).length;
    onValueListeners[id] = cb;
    return function remove() {
        delete onValueListeners[id];
    };
}
function scanAndConnect(service, callbacks, config) {
    return __awaiter(this, void 0, void 0, function () {
        var deviceId, device, error_3, subscription_1, error_4, error_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deviceId = config ? config.initialDeviceId : null;
                    if (!!deviceId) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    callbacks.scanWillStart();
                    return [4 /*yield*/, service.scan()];
                case 2:
                    device = _a.sent();
                    callbacks.scanCompleted();
                    deviceId = device.id;
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    callbacks.scanFailed(error_3);
                    return [2 /*return*/];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    callbacks.connectWillStart();
                    return [4 /*yield*/, service.connect(deviceId)];
                case 5:
                    _a.sent();
                    callbacks.connectCompleted(deviceId);
                    service.__manager.onStateChange(function (state) {
                        console.log('STATE:', state);
                    });
                    subscription_1 = service.__manager.onDeviceDisconnected(deviceId, function (error) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log('ERRROR? ', error);
                            if (error) {
                                logging_1.logEvent('on_device_disconnected_error', { message: "" + error });
                                //   throw error;
                            }
                            logging_1.logEvent('on_device_disconnected', {
                                deviceId: deviceId || 'n/a'
                            });
                            if (deviceId) {
                                scanAndConnect(service, __assign(__assign({}, callbacks), { connectCompleted: function (id) {
                                        callbacks.connectCompleted(id);
                                        subscription_1.remove();
                                    } }), { initialDeviceId: deviceId });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    callbacks.connectFailed(error_4);
                    return [2 /*return*/];
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, service.listen(deviceId)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_5 = _a.sent();
                    callbacks.listenFailed(error_5);
                    return [2 /*return*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.scanAndConnect = scanAndConnect;
function makeService(manager) {
    var _this = this;
    manager.onStateChange(function (newState) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = logging_1.logEvent;
                    _b = ['ble_service_state_change'];
                    _c = {};
                    return [4 /*yield*/, manager.state()];
                case 1:
                    _a.apply(void 0, _b.concat([(_c.state = _d.sent(),
                            _c.newState = newState,
                            _c)]));
                    return [2 /*return*/];
            }
        });
    }); });
    return {
        scan: makeScanFn(manager),
        connect: makeConnectFn(manager),
        listen: makeListenFn(manager),
        addOnValueListener: addOnValueListener,
        __manager: manager
    };
}
exports.makeService = makeService;
exports.defaultService = makeService(!process.env.JEST_WORKER_ID
    ? new react_native_ble_plx_1.BleManager({
        restoreStateIdentifier: 'ble-id',
        restoreStateFunction: function (restoredState) {
            logging_1.logEvent('ble_restore_state_fn', {
                connectedDevices: restoredState
                    ? restoredState.connectedPeripherals.join(',')
                    : 'n/a'
            });
        }
    })
    : {});

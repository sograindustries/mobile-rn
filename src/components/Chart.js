"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_svg_charts_1 = require("react-native-svg-charts");
var react_redux_1 = require("react-redux");
var colors_1 = require("../colors");
var service_1 = require("../ble/service");
var Chart = function (_) {
    var _a = react_1.default.useState([]), data = _a[0], setData = _a[1];
    react_1.default.useEffect(function () {
        var removeListener = service_1.defaultService.addOnValueListener(function (value) {
            setData(function (prevState) {
                return prevState
                    .concat(Array.from(value))
                    .splice(Math.max(prevState.length - 900, 0));
            });
        });
        return removeListener;
    });
    return (<react_native_svg_charts_1.LineChart style={{ height: 200 }} data={data} svg={{ stroke: colors_1.COLOR_RED, strokeWidth: 2 }} contentInset={{ top: 20, bottom: 20 }}></react_native_svg_charts_1.LineChart>);
};
exports.default = react_redux_1.connect(function (state) { return ({
    isConnected: state.ble.status === 'connected'
}); })(Chart);

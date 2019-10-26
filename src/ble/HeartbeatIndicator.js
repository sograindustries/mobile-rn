"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var native_base_1 = require("native-base");
var HeartbeatIndicator = function (_a) {
    var color = _a.color, ecg = _a.ecg;
    return (<native_base_1.Button onPress={function () { }} transparent={true}>
      <native_base_1.View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <native_base_1.Icon name="md-heart" style={{ color: color }}/>

        <native_base_1.View style={{ display: 'flex', flexDirection: 'row' }}>
          <native_base_1.Text style={{ fontSize: 8, color: color }}>
            {ecg !== null ? ecg : '--'}
          </native_base_1.Text>
        </native_base_1.View>
      </native_base_1.View>
    </native_base_1.Button>);
};
var getStatusColor = function (state) {
    switch (state.ble.status) {
        case 'connected':
            return 'red';
        default:
            return 'gray';
    }
};
exports.default = react_redux_1.connect(function (state) { return ({
    ecg: state.ble.ecg,
    color: getStatusColor(state)
}); })(HeartbeatIndicator);

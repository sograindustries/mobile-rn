"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var native_base_1 = require("native-base");
var BleIndicator = function (_a) {
    var color = _a.color, status = _a.status, onPress = _a.onPress;
    return (<native_base_1.Button onPress={function () {
        onPress(status);
    }} transparent={true}>
      <native_base_1.View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        {status === 'scanning' ? (<native_base_1.Spinner size="small" color={color} style={{ height: 30 }}/>) : (<native_base_1.Icon name="ios-bluetooth" style={{ color: color }}/>)}

        <native_base_1.View style={{ display: 'flex', flexDirection: 'row' }}>
          <native_base_1.Text style={{ fontSize: 8, color: color }}>{status}</native_base_1.Text>
        </native_base_1.View>
      </native_base_1.View>
    </native_base_1.Button>);
};
var getStatusColor = function (state) {
    switch (state.ble.status) {
        case 'pending':
            return 'blue';
        case 'connected':
            return 'green';
        case 'scanning':
        case 'disconnected':
            return 'gray';
        case 'error':
        case 'no_peripherals':
            return 'red';
        default:
            return 'blue';
    }
};
exports.default = react_redux_1.connect(function (state) { return ({
    status: state.ble.status,
    color: getStatusColor(state)
}); }, function (_) { return ({
    onPress: function (_) { }
}); })(BleIndicator);

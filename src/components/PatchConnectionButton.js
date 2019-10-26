"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var colors_1 = require("../colors");
var react_redux_1 = require("react-redux");
function bleStatusToColor(status) {
    switch (status) {
        case 'connected':
            return colors_1.COLOR_GREEN;
        case 'connecting':
        case 'pending':
        case 'scanning':
            return colors_1.COLOR_BLUE;
        case 'error':
        case 'no_peripherals':
            return colors_1.COLOR_RED;
        case 'disconnected':
            return colors_1.COLOR_GRAY;
        default:
            return colors_1.COLOR_GRAY;
    }
}
function bleStatusToText(status) {
    switch (status) {
        case 'connected':
            return 'Connected';
        case 'connecting':
        case 'pending':
        case 'scanning':
            return 'Scanning...';
        case 'error':
            return 'Error';
        case 'no_peripherals':
            return 'No Patches Found';
        case 'disconnected':
            return 'Disconnected';
        default:
            return 'Disconnected';
    }
}
function PatchConnectionButton(props) {
    return (<native_base_1.Button style={styles.btn} onPress={function () {
        props.onPress(props.status);
    }}>
      <native_base_1.Icon name="pulse" style={{ color: bleStatusToColor(props.status), fontSize: 42 }}/>
      <native_base_1.Text style={{ color: bleStatusToColor(props.status) }}>
        {bleStatusToText(props.status)}
      </native_base_1.Text>
    </native_base_1.Button>);
}
var styles = react_native_1.StyleSheet.create({
    content: {
        paddingLeft: 5,
        paddingRight: 5
    },
    btn: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});
exports.default = react_redux_1.connect(function (state) { return ({
    status: state.ble.status
}); }, function (_) {
    return {
        onPress: function (status) {
            if (status === 'disconnected' ||
                status === 'no_peripherals' ||
                status === 'error') {
            }
        }
    };
})(PatchConnectionButton);

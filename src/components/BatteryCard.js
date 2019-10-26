"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var colors_1 = require("../colors");
var react_redux_1 = require("react-redux");
function BatteryCard(props) {
    return (<native_base_1.Button style={styles.btn} onPress={function () {
        props.onPress(props.status);
    }}>
      <native_base_1.Icon name="battery-full" style={{
        color: colors_1.COLOR_GREEN,
        fontSize: 42,
        transform: [{ rotate: '270deg' }]
    }}/>
      <native_base_1.Text style={{ color: colors_1.COLOR_GREEN }}>60%</native_base_1.Text>
    </native_base_1.Button>);
}
var styles = react_native_1.StyleSheet.create({
    content: {
        paddingLeft: 5,
        paddingRight: 5
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
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
        onPress: function (_) { }
    };
})(BatteryCard);

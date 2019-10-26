"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var colors_1 = require("../colors");
function ShareWithDoctorCard() {
    return (<native_base_1.Button style={styles.btn}>
      <native_base_1.Icon name="cloud-upload" style={{
        color: colors_1.COLOR_DARK_GRAY,
        fontSize: 42
    }}/>
      <native_base_1.Text style={{ color: colors_1.COLOR_DARK_GRAY }}>Share With Doctor</native_base_1.Text>
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
exports.default = ShareWithDoctorCard;

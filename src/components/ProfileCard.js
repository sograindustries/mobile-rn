"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var colors_1 = require("../colors");
var react_navigation_1 = require("react-navigation");
var App_1 = require("../App");
function ProfileCard(props) {
    return (<native_base_1.Button style={styles.btn} onPress={props.onPress}>
      <native_base_1.Icon name="person" style={{
        color: colors_1.COLOR_DARK_GRAY,
        fontSize: 42
    }}/>
      <native_base_1.Text style={{ color: colors_1.COLOR_DARK_GRAY }}>Profile</native_base_1.Text>
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
exports.default = react_navigation_1.withNavigation(function (props) {
    var onPress = function () { return props.navigation.navigate(App_1.SCREEN_KEY_PROFLIE); };
    return <ProfileCard onPress={onPress}/>;
});

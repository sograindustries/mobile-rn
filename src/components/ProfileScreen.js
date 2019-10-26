"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var LoginScreen_1 = require("./LoginScreen");
var native_base_1 = require("native-base");
var AppHeader_1 = require("./AppHeader");
var react_redux_1 = require("react-redux");
var react_native_elements_1 = require("react-native-elements");
var react_native_1 = require("react-native");
var colors_1 = require("../colors");
var actions_1 = require("../store/session/actions");
var hoc_1 = require("../api/hoc");
var ProfileScreen = function (props) {
    if (!props.isAuthenticated || !props.user) {
        return <LoginScreen_1.default />;
    }
    return (<native_base_1.Container>
      <AppHeader_1.default>
        <native_base_1.Title>Profile</native_base_1.Title>
      </AppHeader_1.default>
      <native_base_1.Content>
        <native_base_1.View style={styles.fieldWrapper}>
          <native_base_1.Text style={styles.fieldNameText}>Username</native_base_1.Text>
          <native_base_1.Text style={styles.fieldValueText}>{props.user.username}</native_base_1.Text>
        </native_base_1.View>
        <react_native_elements_1.Divider />
        <native_base_1.View style={styles.fieldWrapper}>
          <native_base_1.Button transparent onPress={props.onLogoutPress}>
            <native_base_1.Text>Logout</native_base_1.Text>
          </native_base_1.Button>
        </native_base_1.View>
      </native_base_1.Content>
    </native_base_1.Container>);
};
var styles = react_native_1.StyleSheet.create({
    fieldNameText: {
        fontWeight: 'bold',
        paddingLeft: 15,
        flex: 1
    },
    fieldValueText: {
        flex: 2,
        color: colors_1.COLOR_BLUE
    },
    fieldWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    }
});
exports.default = hoc_1.withApi(react_redux_1.connect(function (state) {
    return {
        isAuthenticated: state.session.user !== null,
        user: state.session.user
    };
}, function (dispatch, ownProps) {
    return {
        onLogoutPress: function () {
            dispatch(actions_1.logout(ownProps.api));
        }
    };
})(ProfileScreen));

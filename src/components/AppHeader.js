"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var native_base_1 = require("native-base");
var react_navigation_1 = require("react-navigation");
function AppHeader(_a) {
    var children = _a.children, onBackPress = _a.onBackPress;
    return (<native_base_1.Header>
      <native_base_1.Left>
        <native_base_1.Button onPress={onBackPress} transparent>
          <native_base_1.Icon name="arrow-back" style={{ fontSize: 24 }}/>
        </native_base_1.Button>
      </native_base_1.Left>
      <native_base_1.Body>{children}</native_base_1.Body>
      <native_base_1.Right />
    </native_base_1.Header>);
}
exports.default = react_navigation_1.withNavigation(function (props) {
    var onBackPress = function () {
        props.navigation.goBack();
    };
    return <AppHeader onBackPress={onBackPress}>{props.children}</AppHeader>;
});

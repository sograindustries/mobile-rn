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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var PatchConnectionButton_1 = require("./PatchConnectionButton");
var ChartCard_1 = require("./ChartCard");
var BatteryCard_1 = require("./BatteryCard");
var ProfileCard_1 = require("./ProfileCard");
var colors_1 = require("../colors");
var DeveloperCard_1 = require("./DeveloperCard");
var ShareWithDoctorCard_1 = require("./ShareWithDoctorCard");
var LogsCard_1 = require("./LogsCard");
function MainGrid() {
    return (<native_base_1.Content style={styles.content}>
      <native_base_1.Container style={styles.row}>
        <native_base_1.Card style={styles.card}>
          <ChartCard_1.default />
        </native_base_1.Card>
      </native_base_1.Container>
      <native_base_1.Container style={styles.row}>
        <native_base_1.Card style={styles.card}>
          <PatchConnectionButton_1.default />
        </native_base_1.Card>
        <native_base_1.Card style={styles.card}>
          <BatteryCard_1.default />
        </native_base_1.Card>
      </native_base_1.Container>
      <native_base_1.Container style={styles.row}>
        <native_base_1.Card style={styles.card}>
          <LogsCard_1.default />
        </native_base_1.Card>
      </native_base_1.Container>
      <native_base_1.Container style={styles.row}>
        <native_base_1.Card style={styles.card}>
          <ProfileCard_1.default />
        </native_base_1.Card>
        <native_base_1.Card style={styles.card}>
          <ShareWithDoctorCard_1.default />
        </native_base_1.Card>
      </native_base_1.Container>
      <native_base_1.Container style={styles.row}>
        <native_base_1.Card style={styles.card}>
          <DeveloperCard_1.default />
        </native_base_1.Card>
        <native_base_1.Card style={__assign(__assign({}, styles.card), { opacity: 0 })}></native_base_1.Card>
      </native_base_1.Container>
    </native_base_1.Content>);
}
// <Card style={{ ...styles.card, opacity: 0 }}></Card>
var styles = react_native_1.StyleSheet.create({
    content: {
        paddingLeft: 5,
        paddingRight: 5
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 240
    },
    card: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors_1.COLOR_WHITE,
        borderRadius: 10
    }
});
exports.default = MainGrid;

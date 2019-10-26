"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var react_native_1 = require("react-native");
var BleIndicator_1 = require("../../ble/BleIndicator");
var Chart_1 = require("../../components/Chart");
var StatsCard = function () {
    return (<>
      <native_base_1.Content padder>
        <react_native_1.View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <react_native_1.View style={{ width: 20 }}/>
          <BleIndicator_1.default />
        </react_native_1.View>
        <Chart_1.default />
      </native_base_1.Content>
    </>);
};
var StatsScreen = function () {
    return (<react_native_1.View>
      <StatsCard />
    </react_native_1.View>);
};
exports.default = StatsScreen;

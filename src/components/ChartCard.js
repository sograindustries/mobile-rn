"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var colors_1 = require("../colors");
var react_redux_1 = require("react-redux");
var Chart_1 = require("./Chart");
function ChartCard(props) {
    if (props.status !== 'connected') {
        return (<native_base_1.Container style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5
        }}>
        <native_base_1.Icon name="md-heart" style={{ fontSize: 64, color: colors_1.COLOR_RED }}/>
        <native_base_1.Text>ARGOS</native_base_1.Text>
      </native_base_1.Container>);
    }
    return (<native_base_1.Container style={{
        margin: 5
    }}>
      <Chart_1.default />
    </native_base_1.Container>);
}
exports.default = react_redux_1.connect(function (state) { return ({
    status: state.ble.status
}); })(ChartCard);

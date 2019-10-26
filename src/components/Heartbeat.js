"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _a = require('@react-native-community/art'), Surface = _a.Surface, Group = _a.Group, RadialGradient = _a.RadialGradient, Shape = _a.Shape;
var react_native_1 = require("react-native");
var Heartbeat = function () {
    return <Heart />;
};
exports.default = Heartbeat;
var HEART_SHAPE = 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z';
function Heart() {
    var surfaceDimensions = react_native_1.Dimensions.get('window').width;
    var gradient = new RadialGradient({
        '.1': 'red'
    }, 50, 50, 20, 20, 50, 50);
    return (<Surface width={surfaceDimensions} height={surfaceDimensions / 2} style={styles.surface}>
      <Group visible={true} opacity={1.0} x={surfaceDimensions / 2 - 50} y={surfaceDimensions / 4 - 50}>
        <Shape visible={true} opacity={1.0} d={HEART_SHAPE} fill={gradient}/>
      </Group>
    </Surface>);
}
var styles = react_native_1.StyleSheet.create({
    surface: {
        backgroundColor: 'transparent'
    }
});

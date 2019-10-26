"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var _a = require('@react-native-community/art'), Surface = _a.Surface, Shape = _a.Shape, Path = _a.Path;
var d3 = require("d3");
var data = [];
for (var i = 0; i < 10; i++) {
    data.push({ ts: i, value: i });
}
var HEART_SHAPE = 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z';
var y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, 100]);
var x = d3
    .scaleTime()
    .domain([0, 10])
    .range([0, 100]);
var line = d3
    .line()
    .x(function (d) { return x(d.ts); })
    .y(function (d) { return y(d.value); });
var AnimatedShape = react_native_1.Animated.createAnimatedComponent(Shape);
var HeartbeatIcon = function () {
    console.log(line(data));
    var path = new Path()
        .moveTo(0, 0)
        .lineTo(100, 200)
        .lineTo(30, 100);
    console.log(path);
    var size = new react_native_1.Animated.Value(1);
    react_native_1.Animated.loop(react_native_1.Animated.timing(size, {
        toValue: 0.9,
        duration: 100
    })).start();
    return (<react_native_1.View>
      <Surface width={200} height={200}>
        <AnimatedShape d={HEART_SHAPE} scale={size} originX={400} originY={10} fill="red" visible={true} opacity={1.0}/>
      </Surface>
    </react_native_1.View>);
};
exports.default = HeartbeatIcon;

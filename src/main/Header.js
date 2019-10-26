"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var react_native_1 = require("react-native");
var Animatable = require("react-native-animatable");
var Header = function () {
    return (<native_base_1.View style={styles.body}>
      <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{
        textAlign: 'center',
        width: 50
    }}>
        <native_base_1.Icon name="md-heart" style={styles.heartIcon}/>
      </Animatable.Text>
      <native_base_1.Text style={styles.headerText}>Now</native_base_1.Text>
    </native_base_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    headerText: {
        fontSize: 48
    },
    heartIcon: {
        fontSize: 48,
        color: '#FE5F55'
    }
});
exports.default = Header;

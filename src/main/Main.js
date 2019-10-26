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
var native_base_1 = require("native-base");
var Header_1 = require("./Header");
var react_native_1 = require("react-native");
var Main = function () {
    return (<native_base_1.View style={styles.body}>
      <native_base_1.Card style={styles.card}>
        <Header_1.default />
        <native_base_1.View style={{ flexGrow: 1 }}></native_base_1.View>
        <native_base_1.CardItem style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <native_base_1.Button light iconLeft rounded style={styles.btn}>
            <native_base_1.Icon name="timer" style={{ color: '#FE5F55', marginRight: 5 }}/>
            <react_native_1.Text>76 bpm</react_native_1.Text>
          </native_base_1.Button>

          <native_base_1.Button light iconLeft rounded style={styles.btn}>
            <native_base_1.Icon name="md-pulse" style={{ color: 'green', marginRight: 5 }}/>
            <react_native_1.Text>Normal Sinus Rhythm</react_native_1.Text>
          </native_base_1.Button>
          <native_base_1.Button light iconLeft rounded style={__assign(__assign({}, styles.btn), { marginTop: 10, backgroundColor: '#FFBC7A' })}>
            <native_base_1.Icon name="ios-bicycle" style={{ color: 'black', marginRight: 5 }}/>
            <react_native_1.Text style={{}}>Log Exercise</react_native_1.Text>
          </native_base_1.Button>
        </native_base_1.CardItem>
      </native_base_1.Card>

      <native_base_1.Card style={styles.card}>
        <Header_1.default />
        <native_base_1.View style={{ flexGrow: 1 }}></native_base_1.View>
        <native_base_1.CardItem style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <native_base_1.Button light iconLeft rounded style={styles.btn}>
            <native_base_1.Icon name="timer" style={{ color: '#FE5F55', marginRight: 5 }}/>
            <react_native_1.Text>76 bpm</react_native_1.Text>
          </native_base_1.Button>

          <native_base_1.Button light iconLeft rounded style={styles.btn}>
            <native_base_1.Icon name="md-pulse" style={{ color: 'green', marginRight: 5 }}/>
            <react_native_1.Text>Normal Sinus Rhythm</react_native_1.Text>
          </native_base_1.Button>
          <native_base_1.Button light iconLeft rounded style={__assign(__assign({}, styles.btn), { marginTop: 10, backgroundColor: '#FFBC7A' })}>
            <native_base_1.Icon name="ios-bicycle" style={{ color: 'black', marginRight: 5 }}/>
            <react_native_1.Text style={{}}>Log Exercise</react_native_1.Text>
          </native_base_1.Button>
        </native_base_1.CardItem>
      </native_base_1.Card>
    </native_base_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    body: {
        padding: 8,
        flexGrow: 1
    },
    card: {
        padding: 8,
        height: 320
    },
    btn: {
        padding: 8,
        justifyContent: 'center',
        textAlign: 'center'
    }
});
exports.default = Main;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var react_redux_1 = require("react-redux");
function LogsCard(props) {
    return (<native_base_1.Container style={styles.btn}>
      <native_base_1.Content>
        {props.logs.map(function (item, i) {
        var dateStr = item.ts.getHours() + ":" + item.ts.getMinutes() + ":" + item.ts.getSeconds() + ":" + item.ts.getMilliseconds();
        return (<native_base_1.Text style={{ color: 'white' }} key={i}>
              [LOG {dateStr}] : {item.value}
            </native_base_1.Text>);
    })}
      </native_base_1.Content>
    </native_base_1.Container>);
}
var styles = react_native_1.StyleSheet.create({
    btn: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    }
});
exports.default = react_redux_1.connect(function (state) { return ({
    logs: state.logging.logs
}); })(LogsCard);

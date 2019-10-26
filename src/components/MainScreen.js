"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_navigation_1 = require("react-navigation");
var ConnectedFooter_1 = require("../containers/ConnectedFooter");
var react_redux_1 = require("react-redux");
var StatsScreen_1 = require("../stats/components/StatsScreen");
var DoctorScreen_1 = require("./DoctorScreen");
var SettingsScreen_1 = require("./SettingsScreen");
var native_base_1 = require("native-base");
function renderScreen(tab) {
    switch (tab) {
        case 'home':
            return (<native_base_1.View>
          <native_base_1.Text>Home</native_base_1.Text>
        </native_base_1.View>);
        case 'summary': {
            return <StatsScreen_1.default />;
        }
        case 'doctor':
            return <DoctorScreen_1.default />;
        case 'settings':
            return <SettingsScreen_1.default />;
        default:
            return <></>;
    }
}
var MainScreen = function (_a) {
    var tab = _a.tab;
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_navigation_1.ScrollView style={{ flexGrow: 1, backgroundColor: '#F7F7FF' }} contentContainerStyle={{ flexGrow: 1 }}>
        {renderScreen(tab)}
      </react_navigation_1.ScrollView>
      <ConnectedFooter_1.default />
    </react_native_1.SafeAreaView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});
exports.default = react_redux_1.connect(function (state) { return ({
    tab: state.navigation
}); })(MainScreen);

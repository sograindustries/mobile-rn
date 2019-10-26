"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Footer_1 = require("../components/Footer");
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/navigation/actions");
exports.default = react_redux_1.connect(function (state) { return ({
    tab: state.navigation
}); }, function (dispatch) { return ({
    onProfilePress: function () {
        dispatch(actions_1.updateTab('home'));
    },
    onSummaryPress: function () {
        dispatch(actions_1.updateTab('summary'));
    },
    onDoctorPress: function () {
        dispatch(actions_1.updateTab('doctor'));
    },
    onSettingsPress: function () {
        dispatch(actions_1.updateTab('settings'));
    }
}); })(Footer_1.default);

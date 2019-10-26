"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_redux_1 = require("react-redux");
var MainGrid_1 = require("./MainGrid");
var colors_1 = require("../colors");
var hoc_1 = require("../api/hoc");
var native_base_1 = require("native-base");
var actions_1 = require("../store/session/actions");
var analytics_1 = require("@react-native-firebase/analytics");
var MainScreen2 = function (props) {
    var _a = react_1.default.useState(true), isAuthorizing = _a[0], setIsAuthorizing = _a[1];
    react_1.default.useEffect(function () {
        props.authorize().finally(function () {
            setIsAuthorizing(false);
        });
    }, []);
    if (isAuthorizing) {
        return (<native_base_1.View>
        <native_base_1.Text>Authorizing...</native_base_1.Text>
      </native_base_1.View>);
    }
    return (<react_native_1.SafeAreaView style={styles.container}>
      <MainGrid_1.default />
    </react_native_1.SafeAreaView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors_1.COLOR_LIGHT_GRAY
    }
});
exports.default = hoc_1.withApi(react_redux_1.connect(function (state) { return ({
    tab: state.navigation
}); }, function (dispatch, ownProps) {
    return {
        authorize: function () { return __awaiter(void 0, void 0, void 0, function () {
            var localState, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, ownProps.api.local.getState()];
                    case 1:
                        localState = _b.apply(_a, [(_c.sent()) || '{}']);
                        if (!(localState.session &&
                            localState.session.user &&
                            localState.session.user.refreshToken)) return [3 /*break*/, 4];
                        return [4 /*yield*/, analytics_1.firebase
                                .analytics()
                                .setUserId(localState.session.user.username)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, dispatch(actions_1.refresh(localState.session.user.refreshToken, ownProps.api))];
                    case 3:
                        (_c.sent());
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); }
    };
})(MainScreen2));

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
var native_base_1 = require("native-base");
var react_native_1 = require("react-native");
var AppHeader_1 = require("./AppHeader");
var colors_1 = require("../colors");
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/session/actions");
var hoc_1 = require("../api/hoc");
var react_navigation_1 = require("react-navigation");
function LoginScreen(props) {
    var _this = this;
    var _a = react_1.default.useState('will@argosindustries.com'), username = _a[0], setUsername = _a[1];
    var _b = react_1.default.useState('11111111'), password = _b[0], setPassword = _b[1];
    var _c = react_1.default.useState(null), errorMessage = _c[0], setErrorMessage = _c[1];
    var handleLogin = function () { return __awaiter(_this, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, props.onLoginPress(username, password)];
                case 1:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        setErrorMessage(errors.join(', '));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.KeyboardAvoidingView behavior={react_native_1.Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <native_base_1.View style={{ flex: 1 }}>
        <AppHeader_1.default>
          <native_base_1.Title>Login</native_base_1.Title>
        </AppHeader_1.default>
        <native_base_1.View style={{ flex: 1 }}>
          <native_base_1.Form>
            <native_base_1.Item>
              <native_base_1.Input placeholder="Username" onChangeText={setUsername} value={username}/>
            </native_base_1.Item>
            <native_base_1.Item last>
              <native_base_1.Input placeholder="Password" onChangeText={setPassword} value={password}/>
            </native_base_1.Item>
          </native_base_1.Form>
          {errorMessage ? (<native_base_1.Text style={styles.errorText}>{errorMessage}</native_base_1.Text>) : null}
        </native_base_1.View>
        <native_base_1.Footer>
          <native_base_1.FooterTab>
            <native_base_1.Button primary onPress={handleLogin}>
              <native_base_1.Text style={styles.loginBtnText}>Login</native_base_1.Text>
            </native_base_1.Button>
          </native_base_1.FooterTab>
        </native_base_1.Footer>
      </native_base_1.View>
    </react_native_1.KeyboardAvoidingView>);
}
var styles = react_native_1.StyleSheet.create({
    loginBtnText: {
        fontSize: 18,
        color: colors_1.COLOR_WHITE
    },
    errorText: {
        color: 'red'
    }
});
exports.default = react_navigation_1.withNavigation(hoc_1.withApi(react_redux_1.connect(undefined, function (dispatch, ownProps) {
    return {
        onLoginPress: function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dispatch(actions_1.login(username, password, ownProps.api))];
                    case 1:
                        _a.sent();
                        //     ownProps.navigation.dispatch(resetAction);
                        return [2 /*return*/, []]; // no errors
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, [error_1.code]];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    };
})(LoginScreen)));

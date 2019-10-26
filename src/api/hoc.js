"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _1 = require(".");
var api = _1.makeApi();
exports.withApi = function (Component) {
    return /** @class */ (function (_super) {
        __extends(WithApi, _super);
        function WithApi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithApi.prototype.render = function () {
            return <Component {...this.props} api={api}/>;
        };
        return WithApi;
    }(React.Component));
};

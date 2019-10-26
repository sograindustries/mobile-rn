"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var local_1 = require("./local");
var patch_1 = require("./patch");
var auth_1 = require("./services/auth");
var ecg_1 = require("./services/ecg");
exports.makeApi = function () {
    return {
        local: local_1.default,
        patch: patch_1.default,
        auth: auth_1.makeAuthService(),
        ecg: ecg_1.makeEcgService()
    };
};

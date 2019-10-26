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
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var AWS = require("aws-sdk");
var poolData = {
    UserPoolId: 'us-east-1_9vsr32SCz',
    ClientId: '1hojv8fbr0nkft2p2tbvgksi46' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
exports.makeAuthService = function () {
    return {
        login: function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        var authenticationData = {
                            Username: username,
                            Password: password
                        };
                        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
                        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                            Username: username,
                            Pool: userPool
                        });
                        cognitoUser.authenticateUser(authenticationDetails, {
                            onSuccess: function (result) {
                                console.log('RES: ', JSON.stringify(result.getIdToken()));
                                res({
                                    jwt: result.getIdToken().getJwtToken(),
                                    refreshToken: result.getRefreshToken().getToken(),
                                    username: result.getIdToken()['payload']['cognito:username'],
                                    sub: result.getIdToken()['payload']['sub']
                                });
                            },
                            onFailure: function (err) {
                                rej(err);
                            }
                        });
                    })];
            });
        }); },
        signup: function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        userPool.signUp(username, password, [
                            new AmazonCognitoIdentity.CognitoUserAttribute({
                                Name: 'email',
                                Value: username
                            })
                        ], [], function (err, result) {
                            if (err) {
                                rej(err);
                                return;
                            }
                            if (!result) {
                                rej(new Error('No result available.'));
                                return;
                            }
                            res(result.user);
                        });
                    })];
            });
        }); },
        refresh: function (refreshToken) {
            return new Promise(function (res, rej) {
                var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                    Username: 'will@argosindustries.com',
                    Pool: userPool
                });
                var token = new AmazonCognitoIdentity.CognitoRefreshToken({
                    RefreshToken: refreshToken
                });
                cognitoUser.refreshSession(token, function (err, session) {
                    var _a;
                    if (err) {
                        rej(err);
                        return;
                    }
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
                        Logins: (_a = {},
                            _a["cognito-idp.us-east-1.amazonaws.com/" + poolData.UserPoolId] = session
                                .getIdToken()
                                .getJwtToken(),
                            _a)
                    });
                    var accessToken = session.getIdToken();
                    res({
                        jwt: accessToken.getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken(),
                        username: accessToken['payload']['cognito:username'],
                        sub: accessToken['payload']['sub']
                    });
                });
            });
        },
        getCurrentUser: function () {
            return new Promise(function (res, rej) {
                var cognitoUser = userPool.getCurrentUser();
                if (!cognitoUser) {
                    res(null);
                    return;
                }
                cognitoUser.getSession(function (err, session) {
                    var _a;
                    if (err) {
                        rej(err);
                        return;
                    }
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
                        Logins: (_a = {},
                            _a["cognito-idp.us-east-1.amazonaws.com/" + poolData.UserPoolId] = session
                                .getIdToken()
                                .getJwtToken(),
                            _a)
                    });
                    var accessToken = session.getIdToken();
                    res({
                        jwt: accessToken.getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken(),
                        username: accessToken['payload']['cognito:username'],
                        sub: accessToken['payload']['sub']
                    });
                    /*
                      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: "...", // your identity pool id here
                        Logins: {
                          // Change the key below according to the specific region your user pool is in.
                          [`cognito-idp.us-east-2.amazonaws.com/${poolData.UserPoolId}`]: session
                            .getIdToken()
                            .getJwtToken()
                        }
                      });
                      */
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                });
            });
        },
        signOut: function () {
            return new Promise(function (res, rej) {
                var cognitoUser = userPool.getCurrentUser();
                if (cognitoUser) {
                    cognitoUser.signOut();
                    res();
                }
                else {
                    rej(new Error('User is not available.'));
                }
            });
        }
    };
};

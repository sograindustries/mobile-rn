"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makePersistStateMiddleware(api) {
    return function (store) { return function (next) { return function (action) {
        var result = next(action);
        switch (action.type) {
            case 'ACTION_LOGIN_FAILED':
            case 'ACTION_LOGIN_SUCCESS':
                api.local.setState(store.getState());
                break;
            case 'ACTION_LOGOUT_SUCCESS':
                api.local.setState(null);
        }
        return result;
    }; }; };
}
exports.default = makePersistStateMiddleware;

import { User } from './types';
import { Api } from '../../api';
import { AppThunk } from '..';
export declare function loginSuccess(user: User): {
    type: "ACTION_LOGIN_SUCCESS";
    payload: User;
};
export declare function loginFailed(error: string): {
    type: "ACTION_LOGIN_FAILED";
    payload: string;
};
export declare function completeFirstSession(): {
    type: "ACTION_UPDATE_IS_FIRST_SESSION";
    payload: boolean;
};
export declare function resetFirstSession(): {
    type: "ACTION_UPDATE_IS_FIRST_SESSION";
    payload: boolean;
};
export declare function logoutSuccess(): {
    type: "ACTION_LOGOUT_SUCCESS";
};
export declare function refresh(refreshToken: string, api: Api): AppThunk<Promise<User>, SessionAction>;
export declare function login(username: string, password: string, api: Api): AppThunk<Promise<User>, SessionAction>;
export declare function logout(api: Api): AppThunk<void, SessionAction>;
export declare type SessionAction = ReturnType<typeof loginSuccess | typeof loginFailed | typeof resetFirstSession | typeof completeFirstSession | typeof logoutSuccess>;

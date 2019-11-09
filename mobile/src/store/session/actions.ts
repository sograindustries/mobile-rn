import { User } from './types';
import { action } from 'typesafe-actions';
import { Api } from '../../api';
import { AppThunk } from '..';

export function loginSuccess(user: User) {
  return action('ACTION_LOGIN_SUCCESS', user);
}

export function loginFailed(error: string) {
  return action('ACTION_LOGIN_FAILED', error);
}

export function completeFirstSession() {
  return updateIsFirstSession(false);
}

export function resetFirstSession() {
  return updateIsFirstSession(true);
}

export function logoutSuccess() {
  return action('ACTION_LOGOUT_SUCCESS');
}

function updateIsFirstSession(isFirstSession: boolean) {
  return action('ACTION_UPDATE_IS_FIRST_SESSION', isFirstSession);
}

export function refresh(
  refreshToken: string,
  api: Api
): AppThunk<Promise<User>, SessionAction> {
  return async dispatch => {
    try {
      const user = await api.auth.refresh(refreshToken);
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      dispatch(loginFailed(`${error}`));
      throw error;
    }
  };
}

export function login(
  username: string,
  password: string,
  api: Api
): AppThunk<Promise<User>, SessionAction> {
  return async dispatch => {
    try {
      dispatch;
      const user = await api.auth.login(username, password);
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      throw error;
    }
  };
}

export function logout(api: Api): AppThunk<void, SessionAction> {
  return async dispatch => {
    try {
      await api.auth.signOut();
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Signout error: ', error);
      throw error;
    }
  };
}

export type SessionAction = ReturnType<
  | typeof loginSuccess
  | typeof loginFailed
  | typeof resetFirstSession
  | typeof completeFirstSession
  | typeof logoutSuccess
>;

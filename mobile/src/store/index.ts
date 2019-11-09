import { combineReducers, Dispatch, MiddlewareAPI, AnyAction } from 'redux';
import { reducer as ble } from './ble/reducers';
import { reducer as navigation } from './navigation/reducers';
import { DeepReadonly } from 'utility-types';
import { reducer as session } from './session/reducers';
import { SessionAction } from './session/actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BleAction } from './ble/actions';
import { reducer as logging } from './logging/reducers';
import { reducer as settings } from './settings/reducers';
import { reducer as user } from './user/reducers';
import { SettingsAction } from './settings/actions';
import { UserAction } from './user/actions';

export const rootReducer = combineReducers({
  ble,
  navigation,
  session,
  logging,
  settings,
  user
});

type AppAction = SessionAction | BleAction | SettingsAction | UserAction;
export type AppState = DeepReadonly<ReturnType<typeof rootReducer>>;
export type AppDispatch = ThunkDispatch<AppState, any, any>;
export type AppMiddleware = (
  api: MiddlewareAPI<Dispatch, AppState>
) => (next: AppDispatch) => (action: AppAction) => any;
export type AppThunk<R, Action extends AnyAction> = ThunkAction<
  R,
  AppState,
  {},
  Action
>;

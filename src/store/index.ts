import { combineReducers, Dispatch, MiddlewareAPI, AnyAction } from 'redux';
import { reducer as ble } from './ble/reducers';
import { reducer as navigation } from './navigation/reducers';
import { DeepReadonly } from 'utility-types';
import { reducer as session } from './session/reducers';
import { SessionAction } from './session/actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BleAction } from './ble/actions';
import { reducer as logging } from './logging/reducers';

export const rootReducer = combineReducers({
  ble,
  navigation,
  session,
  logging
});

type AppAction = SessionAction | BleAction;
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

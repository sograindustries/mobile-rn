import { combineReducers } from 'redux';
import { User } from './types';
import { SessionAction } from './actions';

function isFirstSession(state: boolean = true, action: SessionAction): boolean {
  switch (action.type) {
    case 'ACTION_UPDATE_IS_FIRST_SESSION':
      return action.payload;
    default:
      return state;
  }
}

function user(state: User | null = null, action: SessionAction) {
  switch (action.type) {
    case 'ACTION_LOGIN_SUCCESS':
      return action.payload;
    case 'ACTION_LOGIN_FAILED':
      return null;
    case 'ACTION_LOGOUT_SUCCESS':
      return null;
    case 'ACTION_RESET_SESSION':
      return null;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  user,
  isFirstSession
});

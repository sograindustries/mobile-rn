import { UserAction } from './actions';
import { User } from './types';
import { SessionAction } from '../session/actions';

function user(state: User | null = null, action: UserAction | SessionAction) {
  switch (action.type) {
    case 'ACTION_SET_USER':
      return action.payload;
    case 'ACTION_LOGOUT_SUCCESS':
      return null;
    default:
      return state;
  }
}

export const reducer = user;

import {State, NavigationAction, ACTION_UPDATE_TAB} from './types';

export function reducer(
  state: State = 'home',
  action: NavigationAction,
): State {
  switch (action.type) {
    case ACTION_UPDATE_TAB:
      return action.payload;
    default:
      return state;
  }
}

import {Tab, NavigationAction} from './types';

export function updateTab(tab: Tab): NavigationAction {
  return {
    type: 'ACTION_UPDATE_TAB',
    payload: tab,
  };
}

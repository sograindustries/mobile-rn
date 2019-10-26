export type Tab = 'home' | 'summary' | 'doctor' | 'settings';
export type State = Tab;

export const ACTION_UPDATE_TAB = 'ACTION_UPDATE_TAB';

interface UpdateTabAction {
  type: typeof ACTION_UPDATE_TAB;
  payload: Tab;
}

export type NavigationAction = UpdateTabAction;

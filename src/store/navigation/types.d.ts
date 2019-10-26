export declare type Tab = 'home' | 'summary' | 'doctor' | 'settings';
export declare type State = Tab;
export declare const ACTION_UPDATE_TAB = "ACTION_UPDATE_TAB";
interface UpdateTabAction {
    type: typeof ACTION_UPDATE_TAB;
    payload: Tab;
}
export declare type NavigationAction = UpdateTabAction;
export {};

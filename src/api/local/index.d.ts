import { AppState } from '../../store';
declare function getState(): Promise<string | null>;
declare function setState(state: AppState | null): Promise<void>;
declare const _default: {
    getState: typeof getState;
    setState: typeof setState;
};
export default _default;

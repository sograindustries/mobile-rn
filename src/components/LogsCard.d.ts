import { LogItem } from '../store/logging/types';
import { DeepReadonly } from 'utility-types';
interface Props {
    logs: DeepReadonly<LogItem[]>;
}
declare function LogsCard(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof LogsCard, Pick<Props, never>>;
export default _default;

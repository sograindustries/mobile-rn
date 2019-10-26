import { BleStatus } from '../store/ble/types';
interface Props {
    status: BleStatus;
}
declare function ChartCard(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof ChartCard, Pick<Props, never>>;
export default _default;

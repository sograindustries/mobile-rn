import { BleStatus } from '../store/ble/types';
interface Props {
    status: BleStatus;
    color: string;
    onPress: (status: BleStatus) => void;
}
declare const _default: import("react-redux").ConnectedComponent<({ color, status, onPress }: Props) => JSX.Element, Pick<Props, never>>;
export default _default;

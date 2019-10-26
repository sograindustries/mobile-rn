import { BleStatus } from '../store/ble/types';
interface Props {
    status: BleStatus;
    onPress: (status: BleStatus) => void;
}
declare function PatchConnectionButton(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof PatchConnectionButton, Pick<Props, never>>;
export default _default;

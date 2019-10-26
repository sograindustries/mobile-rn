export declare function addOnValueListener(cb: (value: Int16Array) => void): () => void;
interface Props {
    onScanStart: () => void;
    onScanError: () => void;
    onConnectStart: () => void;
    onConnectSuccess: (deviceId: string) => void;
    onConnectError: () => void;
}
declare function BleContainer(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof BleContainer, Pick<Props, never>>;
export default _default;

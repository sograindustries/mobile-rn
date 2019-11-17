import * as React from 'react';
import DeveloperOnly from './DeveloperOnly';
import { Text } from 'native-base';
import { WithBleProps, withBle } from '../ble/hoc';
import { connect } from 'react-redux';
import { AppState } from '../store';

interface Props {
  deviceId: string | null;
  fwVersion: string | null;
}

function BleFWInfo(props: Props & WithBleProps) {
  return (
    <DeveloperOnly>
      <Text>Device: {props.deviceId}</Text>
      <Text>FW hash: {props.fwVersion}</Text>
    </DeveloperOnly>
  );
}

export default connect((state: AppState) => ({
  deviceId: state.ble.deviceId,
  fwVersion: state.ble.firmwareVersion
}))(withBle(BleFWInfo));

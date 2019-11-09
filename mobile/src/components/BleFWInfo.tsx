import * as React from 'react';
import DeveloperOnly from './DeveloperOnly';
import { Text } from 'native-base';
import { WithBleProps, withBle } from '../ble/hoc';
import { connect } from 'react-redux';
import { AppState } from '../store';

interface Props {
  deviceId: string | null;
}

function BleFWInfo(props: Props & WithBleProps) {
  const [commitHash, setCommitHash] = React.useState<string | null>(null);
  const [uptime, setUptime] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (props.deviceId) {
      props.ble
        .getFWCommitHash(props.deviceId)
        .then(setCommitHash)
        .catch(e => {
          console.warn('ERROR: ', e);
        });

      props.ble
        .getUptime(props.deviceId)
        .then(setUptime)
        .catch(e => {
          console.warn('ERROR: ', e);
        });
    }
  }, [props.deviceId]);

  return (
    <DeveloperOnly>
      <Text>Device: {props.deviceId}</Text>
      <Text>FW hash: {commitHash}</Text>
      {uptime && <Text>Uptime: {(uptime * 10) / 1000}s</Text>}
    </DeveloperOnly>
  );
}

export default connect((state: AppState) => ({
  deviceId: state.ble.deviceId
}))(withBle(BleFWInfo));

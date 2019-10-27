import * as React from 'react';
import { View } from 'native-base';
import { defaultService as bleService, scanAndConnect } from '../ble/service';
import { connect } from 'react-redux';
import { logEvent } from '../logging';
import {
  scanStart,
  scanFailed,
  connectStart,
  connectSuccess,
  connectFailed
} from '../store/ble/actions';

const LOG_KEY_BLE_CNOTAINER = 'ble_container';

interface Props {
  onMount: () => void;
}

function BleContainer(props: Props) {
  React.useEffect(() => {
    props.onMount();
  }, []);

  return <View />;
}

export default connect(
  undefined,
  dispatch => {
    const onMount = async () => {
      scanAndConnect(bleService, {
        scanWillStart: () => {
          dispatch(scanStart());
        },
        scanCompleted: () => {
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: 'scan completed.' });
        },
        scanFailed: error => {
          dispatch(scanFailed());
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: `${error}` });
        },

        connectWillStart: () => {
          dispatch(connectStart());
        },

        connectCompleted: deviceId => {
          dispatch(connectSuccess(deviceId));
        },

        connectFailed: error => {
          dispatch(connectFailed());
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: `${error}` });
        },

        listenFailed: () => {}
      });
    };
    return {
      onMount
    };
  }
)(BleContainer);

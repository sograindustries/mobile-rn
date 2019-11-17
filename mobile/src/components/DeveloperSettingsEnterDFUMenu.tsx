import * as React from 'react';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { WithBleProps, withBle } from '../ble/hoc';
import DeveloperOnly from './DeveloperOnly';

interface Props {
  onPress: () => void;
}

function DeveloperSettingsEnterDFUMenu(props: Props) {
  return (
    <DeveloperOnly>
      <Button full onPress={props.onPress} danger style={{ marginTop: 40 }}>
        <Text>Enter DFU Mode</Text>
      </Button>
    </DeveloperOnly>
  );
}

export default withBle(
  connect(
    undefined,
    (dispatch: AppDispatch, ownProps: WithBleProps) => {
      return {
        onPress: () => {
          dispatch((_: AppDispatch, getState: () => AppState) => {
            const deviceId = getState().ble.deviceId;
            if (deviceId) {
              ownProps.ble.enterDFU(deviceId);
            }
          });
        }
      };
    }
  )(DeveloperSettingsEnterDFUMenu)
);

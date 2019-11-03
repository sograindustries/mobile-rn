import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { BleStatus } from '../store/ble/types';
import { COLOR_GREEN, COLOR_BLUE, COLOR_RED, COLOR_GRAY } from '../colors';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';

interface Props {
  status: BleStatus;
  onPress: (status: BleStatus) => void;
}

function bleStatusToColor(status: BleStatus) {
  switch (status) {
    case 'connected':
      return COLOR_GREEN;
    case 'connecting':
    case 'pending':
    case 'scanning':
      return COLOR_BLUE;
    case 'error':
    case 'no_peripherals':
      return COLOR_RED;
    case 'disconnected':
      return COLOR_GRAY;
    default:
      return COLOR_GRAY;
  }
}

function bleStatusToText(status: BleStatus) {
  switch (status) {
    case 'connected':
      return 'Connected';
    case 'connecting':
    case 'pending':
    case 'scanning':
      return 'Scanning...';
    case 'error':
      return 'Error';
    case 'no_peripherals':
      return 'No Patches Found';
    case 'disconnected':
      return 'Disconnected';
    default:
      return 'Disconnected';
  }
}

function PatchConnectionButton(props: Props) {
  return (
    <Button
      style={styles.btn}
      onPress={() => {
        props.onPress(props.status);
      }}>
      <Icon
        name="pulse"
        style={{ color: bleStatusToColor(props.status), fontSize: 42 }}
      />
      <Text style={{ color: bleStatusToColor(props.status) }}>
        {bleStatusToText(props.status)}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

export default connect(
  (state: AppState) => ({
    status: state.ble.status
  }),
  (_: AppDispatch) => {
    return {
      onPress: (status: BleStatus) => {
        if (
          status === 'disconnected' ||
          status === 'no_peripherals' ||
          status === 'error'
        ) {
        }
      }
    };
  }
)(PatchConnectionButton);

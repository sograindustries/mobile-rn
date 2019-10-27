import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { BleStatus } from '../store/ble/types';
import { View, Icon, Button, Text, Spinner } from 'native-base';

interface Props {
  status: BleStatus;
  color: string;
  onPress: (status: BleStatus) => void;
}

const BleIndicator = ({ color, status, onPress }: Props) => {
  return (
    <Button
      onPress={() => {
        onPress(status);
      }}
      transparent={true}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {status === 'scanning' ? (
          <Spinner size="small" color={color} style={{ height: 30 }} />
        ) : (
          <Icon name="ios-bluetooth" style={{ color }} />
        )}

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: 8, color }}>{status}</Text>
        </View>
      </View>
    </Button>
  );
};

const getStatusColor = (state: AppState) => {
  switch (state.ble.status) {
    case 'pending':
      return 'blue';
    case 'connected':
      return 'green';
    case 'scanning':
    case 'disconnected':
      return 'gray';
    case 'error':
    case 'no_peripherals':
      return 'red';
    default:
      return 'blue';
  }
};

export default connect(
  (state: AppState) => ({
    status: state.ble.status,
    color: getStatusColor(state)
  }),
  _ => ({
    onPress: (_: BleStatus) => {}
  })
)(BleIndicator);

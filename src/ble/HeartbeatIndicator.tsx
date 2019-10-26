import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { View, Icon, Button, Text } from 'native-base';

interface Props {
  ecg: number | null;
  color: string;
}

const HeartbeatIndicator = ({ color, ecg }: Props) => {
  return (
    <Button onPress={() => {}} transparent={true}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Icon name="md-heart" style={{ color }} />

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: 8, color }}>
            {ecg !== null ? ecg : '--'}
          </Text>
        </View>
      </View>
    </Button>
  );
};

const getStatusColor = (state: AppState) => {
  switch (state.ble.status) {
    case 'connected':
      return 'red';
    default:
      return 'gray';
  }
};

export default connect((state: AppState) => ({
  ecg: state.ble.ecg,
  color: getStatusColor(state)
}))(HeartbeatIndicator);
